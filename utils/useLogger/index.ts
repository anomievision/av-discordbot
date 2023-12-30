import { pushToConsole } from "./console.js";
import { pushToDatabase } from "./database.js";

interface Payload {
    timestamp: Date;
    source: string;
    level: "log" | "debug" | "info" | "warn" | "error";
    message: string;
    context?: string;
}

function createPayload(
    level: "log" | "debug" | "info" | "warn" | "error",
    source: string,
    message: string,
    context?: string
): Payload {
    return {
        timestamp: new Date(),
        source,
        level,
        message,
        context
    };
}

export async function useLogger(
    level: "log" | "debug" | "info" | "warn" | "error",
    source: string,
    message: string,
    context?: string
): Promise<void> {
    if (process.env.LOGGING_ENABLED === "true") {
        const payload = createPayload(level, source, message, context);

        if (process.env.LOGGING_CONSOLE_ENABLED === "true")
            pushToConsole(payload);

        if (process.env.LOGGING_DATABASE_ENABLED === "true")
            await pushToDatabase(payload);
    }
}