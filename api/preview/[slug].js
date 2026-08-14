import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {

    let { slug } = req.query;
    let guestName = '';

    if (Array.isArray(slug)) {
        if (slug.length >= 2) {
            guestName = slug.slice(1).join('/');
        }
        slug = slug[0];
    } else if (typeof slug === 'string' && slug.includes('/')) {
        const parts = slug.split('/');
        slug = parts[0];
        guestName = parts.slice(1).join('/');
    }

    const redirectPath = guestName ? `/${slug}/${guestName}` : `/${slug}`;

    if (slug === "templates") {
        const title = "Katalog Undangan Digital Premium - Pilih Desain Impianmu ✨";
        const description = "Jasa Pembuatan Undangan Digital Elegan & Modern. Fitur Lengkap: Musik, Galeri Foto, Maps, Countdown & Buku Tamu Online. Buat Sekarang!";
        const image = "https://undangan-universal.vercel.app/og-templates-pro.png";

        res.setHeader("Content-Type", "text/html");
        return res.send(`
<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="utf-8"/>
<title>${title}</title>
<meta name="description" content="${description}" />

<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:image" content="${image}" />
<meta property="og:image:secure_url" content="${image}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://undangan-universal.vercel.app/templates" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${description}" />
<meta name="twitter:image" content="${image}" />

<script>
window.location.replace("/templates");
</script>
</head>
<body>
Redirecting to catalog...
</body>
</html>
        `);
    }

    let bride_name = '';
    let groom_name = '';
    let akad_date_text = '';
    let akad_location = '';
    let cover_bg_image = '';

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

    if (data) {
        bride_name = data.bride_name;
        groom_name = data.groom_name;
        akad_date_text = data.akad_date_text || '';
        akad_location = data.akad_location || '';
        cover_bg_image = data.cover_bg_image || '';
    } else if (slug === 'kartina-frima' || slug === 'lulu-bayu') {
        bride_name = 'Kartina';
        groom_name = 'Frima';
        akad_date_text = 'Ahad, 16 Agustus 2026';
        akad_location = 'Gedung PT INTI';
    } else {
        return res.status(404).send("Undangan tidak ditemukan");
    }

    const title =
        `Undangan Pernikahan ${bride_name} & ${groom_name}`;

    const description =
        `${akad_date_text} ${akad_location}`;

    let image = "https://undangan-universal.vercel.app/bg-wedding.png";
    if (cover_bg_image) {
        if (cover_bg_image.startsWith("http://") || cover_bg_image.startsWith("https://")) {
            image = cover_bg_image;
        } else {
            image = `https://undangan-universal.vercel.app/${cover_bg_image.replace(/^\//, '')}`;
        }
    }

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
<meta property="og:image:secure_url" content="${image}" />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://undangan-universal.vercel.app/preview/${slug}" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${description}" />
<meta name="twitter:image" content="${image}" />

<script>
window.location.replace("${redirectPath}");
</script>

</head>

<body>

Redirecting...

</body>
</html>
`);
}