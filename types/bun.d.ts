declare module "bun" {
    interface Env {
        PREFIX: string
        TOKEN: string
        DIRECT_URL: string
        DATABASE_URL: string
        LINEAR_API_KEY: string
        LINEAR_TEAM_ID: string
        LOGGING_ENABLED: string
        LOGGING_CONSOLE_ENABLED: string
        LOGGING_DATABASE_ENABLED: string
        SUPABASE_URL: string
        SUPABASE_KEY: string
        SUPABASE_SERVICE_KEY: string
    }

    interface BunFile extends Blob {
        json(): Promise<unknown>
    }
}