import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  try {
    res.json({
      slug: req.query.slug,
      url: process.env.VITE_SUPABASE_URL,
      hasKey: !!process.env.VITE_SUPABASE_ANON_KEY,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}