const functions = require("firebase-functions");
const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");

const SUPABASE_URL = "https://isyaszjtcwumddjrmpfd.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzeWFzemp0Y3d1bWRkanJtcGZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExOTAzNjcsImV4cCI6MjA5Njc2NjM2N30.9hAMeOnrMJddS2WwRF1JWou0-7oPGfkqgINa7ydzmkM";

// Mock data fallback for demo slugs
const mockWeddings = {
  "lulu-bayu": { bride_name: "Lulu", groom_name: "Bayu", akad_date_text: "Ahad, 16 Agustus 2026" },
  "joko-riri": { bride_name: "Riri", groom_name: "Joko", akad_date_text: "Sabtu, 10 Oktober 2026" },
  "andi-rina": { bride_name: "Rina", groom_name: "Andi", akad_date_text: "Sabtu, 20 September 2026" },
  "budi-siti": { bride_name: "Siti", groom_name: "Budi", akad_date_text: "Ahad, 15 November 2026" },
  "anton-mega": { bride_name: "Mega", groom_name: "Anton", akad_date_text: "Jumat, 25 Desember 2026" },
};

// List of known non-slug routes that should NOT be handled by this function
const RESERVED_PATHS = ["templates", "buy", "payment-pending", "setup-wedding", "admin", "__"];

exports.ogMeta = functions.https.onRequest(async (req, res) => {
  const urlPath = req.path.replace(/^\//, "").replace(/\/$/, "");

  // Skip reserved paths and asset files
  if (!urlPath || RESERVED_PATHS.some((p) => urlPath.startsWith(p)) || urlPath.includes(".")) {
    // Serve the default index.html
    const indexPath = path.join(__dirname, "../dist/index.html");
    if (fs.existsSync(indexPath)) {
      res.set("Cache-Control", "public, max-age=300");
      return res.status(200).send(fs.readFileSync(indexPath, "utf8"));
    }
    return res.status(404).send("Not found");
  }

  const slug = urlPath;

  // Try to fetch wedding data from Supabase
  let wedding = null;
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/weddings?slug=eq.${encodeURIComponent(slug)}&select=bride_name,groom_name,akad_date_text,akad_location`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
      }
    );
    const data = await response.json();
    if (Array.isArray(data) && data.length > 0) {
      wedding = data[0];
    }
  } catch (err) {
    console.error("Supabase fetch error:", err);
  }

  // Fallback to mock data if not found in DB
  if (!wedding && mockWeddings[slug]) {
    wedding = mockWeddings[slug];
  }

  // If still not found, serve default index.html
  if (!wedding) {
    const indexPath = path.join(__dirname, "../dist/index.html");
    if (fs.existsSync(indexPath)) {
      return res.status(200).send(fs.readFileSync(indexPath, "utf8"));
    }
    return res.status(404).send("Not found");
  }

  // Build dynamic OG meta tags
  const title = `Undangan Pernikahan ${wedding.bride_name} & ${wedding.groom_name}`;
  const description = `Anda diundang ke pernikahan ${wedding.bride_name} & ${wedding.groom_name}. ${wedding.akad_date_text || ""}${wedding.akad_location ? " di " + wedding.akad_location : ""}. Buka undangan digital ini untuk info lengkap.`;
  const url = `https://${req.hostname}/${slug}`;

  // Read the dist/index.html and inject OG tags
  const indexPath = path.join(__dirname, "../dist/index.html");
  let html = fs.readFileSync(indexPath, "utf8");

  // Replace existing <title>
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${title}</title>`
  );

  // Inject OG meta tags before </head>
  const ogTags = `
    <!-- Dynamic OG Meta Tags -->
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${url}" />
    <meta name="description" content="${description}" />
    <meta property="og:site_name" content="Undangan Digital" />
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
  `;

  html = html.replace("</head>", `${ogTags}\n  </head>`);

  res.set("Cache-Control", "public, max-age=300, s-maxage=600");
  return res.status(200).send(html);
});
