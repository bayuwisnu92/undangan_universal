import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {

    const { slug } = req.query;

    console.log("Slug:", slug);

    const { data, error } = await supabase
        .from("weddings")
        .select("*")
        .eq("slug", slug);

    console.log("DATA:", data);
    console.log("ERROR:", error);

    return res.json({
        slug,
        data,
        error
    });

}