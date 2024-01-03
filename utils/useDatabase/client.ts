import { createClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";

let supabaseClient: SupabaseClient<Database>;
let isSupabaseClientInitialized = false;
let supabaseServiceClient: SupabaseClient<Database>;
let isSupabaseServiceClientInitialized = false;

export function useSupabaseClient(): SupabaseClient<Database> {
    if (!isSupabaseClientInitialized) {
        supabaseClient = createClient<Database>(process.env.SUPABASE_URL, process.env.SUPABASE_KEY, {
            auth: {
                autoRefreshToken: true,
                persistSession: true,
                detectSessionInUrl: false
            }
        });

        isSupabaseClientInitialized = true;
    }

    return supabaseClient;
}

export function useSupabaseServiceClient(): SupabaseClient<Database> {
    if (!isSupabaseServiceClientInitialized) {
        supabaseServiceClient = createClient<Database>(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY, {
            auth: {
                autoRefreshToken: true,
                persistSession: true,
                detectSessionInUrl: false
            }
        });

        isSupabaseServiceClientInitialized = true;
    }

    return supabaseServiceClient;
}
