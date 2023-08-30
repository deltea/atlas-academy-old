import { createClient } from "@supabase/supabase-js";
import type { Database } from "$lib/database";

const projectUrl = "https://yffafiivlcjjhazjsvnh.supabase.co";
const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmZmFmaWl2bGNqamhhempzdm5oIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTMzNzU5MDEsImV4cCI6MjAwODk1MTkwMX0.5xE6Rl6LGUXA3Ld08rcgwwHX2yS4qxSSX8uCvJH7iWM";

export const supabase = createClient<Database>(projectUrl, anonKey);
