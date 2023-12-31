import { createClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";

type SupabaseClientDiscord = SupabaseClient<any, "private", any>;

class SupabaseService {
    private static _instance: SupabaseService | null = null;
    private readonly _supabase: SupabaseClientDiscord;

    private constructor() {
        this._supabase = createClient(
            process.env.SUPABASE_URL,
            process.env.SUPABASE_SERVICE_KEY,
            {
                db: {
                    schema: "private"
                },
                auth: {
                    autoRefreshToken: true,
                    persistSession: true,
                    detectSessionInUrl: false
                }
            }
        );
    }

    public static getInstance(): SupabaseService {
        if (!SupabaseService._instance)
            SupabaseService._instance = new SupabaseService();

        return SupabaseService._instance;
    }

    public get supabase(): SupabaseClientDiscord {
        return this._supabase;
    }
}

const supabaseService = SupabaseService.getInstance();

export const useSupabaseClient = supabaseService.supabase;
