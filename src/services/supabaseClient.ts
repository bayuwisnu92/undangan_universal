import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://isyaszjtcwumddjrmpfd.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzeWFzemp0Y3d1bWRkanJtcGZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExOTAzNjcsImV4cCI6MjA5Njc2NjM2N30.9hAMeOnrMJddS2WwRF1JWou0-7oPGfkqgINa7ydzmkM";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
