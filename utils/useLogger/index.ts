import { print } from "./console.js";
import { pushToDatabase } from "./database.js";

export async function useLogger(
    level: "log" | "debug" | "info" | "warn" | "error",
    category: string,
    message: string,
    context?: string,
    timestamp: number = new Date().getTime()
): Promise<void> {
    if (process.env.LOGGING_ENABLED === "true") {
        const payload: Logger.Payload = { level, category, message, context, timestamp };

        if (process.env.LOGGING_CONSOLE_ENABLED === "true")
            print(payload);

        if (process.env.LOGGING_DATABASE_ENABLED === "true")
            await pushToDatabase(payload);
    }
}
