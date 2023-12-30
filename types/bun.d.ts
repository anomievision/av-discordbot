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
    }
}