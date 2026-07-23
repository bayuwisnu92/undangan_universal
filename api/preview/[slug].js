import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {

    const { slug } = req.query;

    const { data, error } = await supabase
        .from("weddings")
        .select(`
            bride_name,
            groom_name,
            akad_date_text,
            akad_location,
            cover_bg_image
        `)
        .eq("slug", slug)
        .maybeSingle();

    if (error || !data) {
        return res.status(404).send("Undangan tidak ditemukan");
    }

    const title =
        `Undangan Pernikahan ${data.bride_name} & ${data.groom_name}`;

    const description =
        `${data.akad_date_text ?? ""} ${data.akad_location ?? ""}`;

    const image =
        data.cover_bg_image
            ? `https://undangan-universal.vercel.app/${data.cover_bg_image}`
            : `https://undangan-universal.vercel.app/asset/default-cover.jpg`;

    res.setHeader("Content-Type", "text/html");

    res.send(`
<!DOCTYPE html>
<html lang="id">
<head>

<meta charset="utf-8"/>

<title>${title}</title>

<meta name="description" content="${description}" />

<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:image" content="${image}" />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://undangan-universal.vercel.app/preview/${slug}" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${description}" />
<meta name="twitter:image" content="${image}" />

<script>
window.location.replace("/${slug}");
</script>

</head>

<body>

Redirecting...

</body>
</html>
`);
}