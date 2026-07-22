import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.VITE_SUPABASE_ANON_KEY
)

export default async function handler(req, res) {

    const { slug } = req.query

    const { data } = await supabase
        .from("weddings")
        .select(`
            bride_name,
            groom_name,
            akad_date_text,
            akad_location,
            cover_bg_image
        `)
        .eq("slug", slug)
        .single()

    if (!data) {

        return res.redirect("/")
    }

    const title =
        `Undangan Pernikahan ${data.bride_name} & ${data.groom_name}`

    const description =
        `${data.akad_date_text} di ${data.akad_location}`

    const image =
        `https://undangan-universal.vercel.app/${data.cover_bg_image}`

    const html = `
<!DOCTYPE html>
<html>

<head>

<title>${title}</title>

<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:image" content="${image}">
<meta property="og:url" content="https://undangan-universal.vercel.app/i/${slug}">
<meta property="og:type" content="website">

<meta name="twitter:card" content="summary_large_image">

<script>

window.location.href="/${slug}"

</script>

</head>

<body>

Redirecting...

</body>

</html>
`

    res.setHeader("Content-Type", "text/html")

    res.status(200).send(html)

}