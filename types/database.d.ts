import type { Database as SupabaseDatabase } from "./supabase.js";

declare global {
    type SelectEmbed = SnakeToCamelCaseNested<SupabaseDatabase["discord"]["Tables"]["embed"]["Row"]>
    type InsertEmbed = SnakeToCamelCaseNested<SupabaseDatabase["discord"]["Tables"]["embed"]["Insert"]>
    type UpdateEmbed = SnakeToCamelCaseNested<SupabaseDatabase["discord"]["Tables"]["embed"]["Update"]>
    type SelectLog = SnakeToCamelCaseNested<SupabaseDatabase["discord"]["Tables"]["log"]["Row"]>
    type InsertLog = SnakeToCamelCaseNested<SupabaseDatabase["discord"]["Tables"]["log"]["Insert"]>
    type UpdateLog = SnakeToCamelCaseNested<SupabaseDatabase["discord"]["Tables"]["log"]["Update"]>
    type SelectUser = SnakeToCamelCaseNested<SupabaseDatabase["discord"]["Tables"]["user"]["Row"]>
    type InsertUser = SnakeToCamelCaseNested<SupabaseDatabase["discord"]["Tables"]["user"]["Insert"]>
    type UpdateUser = SnakeToCamelCaseNested<SupabaseDatabase["discord"]["Tables"]["user"]["Update"]>
    type SelectProfile = SnakeToCamelCaseNested<SupabaseDatabase["public"]["Tables"]["profile"]["Row"]>

    type Schema = keyof SupabaseDatabase
    type Database = SupabaseDatabase

    namespace Database {
        type SelectEmbed = SupabaseDatabase["discord"]["Tables"]["embed"]["Row"]
        type InsertEmbed = SupabaseDatabase["discord"]["Tables"]["embed"]["Insert"]
        type UpdateEmbed = SupabaseDatabase["discord"]["Tables"]["embed"]["Update"]
        type SelectLog = SupabaseDatabase["discord"]["Tables"]["log"]["Row"]
        type InsertLog = SupabaseDatabase["discord"]["Tables"]["log"]["Insert"]
        type UpdateLog = SupabaseDatabase["discord"]["Tables"]["log"]["Update"]
        type SelectUser = SupabaseDatabase["discord"]["Tables"]["user"]["Row"]
        type InsertUser = SupabaseDatabase["discord"]["Tables"]["user"]["Insert"]
        type UpdateUser = SupabaseDatabase["discord"]["Tables"]["user"]["Update"]
        type SelectProfile = SupabaseDatabase["public"]["Tables"]["profile"]["Row"]
    }
}

export { };