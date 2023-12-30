/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { prismaClient } from "@database";
import {
    parseUsing24BitColors
} from "tasai";

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

function formatMessage(payload: Payload): string {
    const { timestamp, source, level, message, context } = payload;

    const formattedTimestamp = timestamp.toISOString();
    const formattedLevel = level.toUpperCase().padEnd(5, " ");
    const formattedContext = context ? ` [${context}]` : "";

    const styledTimestamp = `<yellow>[<r>${formattedTimestamp}<yellow>]<r>`;
    const styledSource = `<yellow>[<r><blue>${source}<r><yellow>]<r>`;
    const styledLevel = (): string => {
        switch (level) {
            case "log":
                return `<green>${formattedLevel}<r>`;
            case "debug":
                return `<cyan>${formattedLevel}<r>`;
            case "info":
                return `<blue>${formattedLevel}<r>`;
            case "warn":
                return `<yellow>${formattedLevel}<r>`;
            case "error":
                return `<red>${formattedLevel}<r>`;
        }
    };
    const styledMessage = `${message}`;
    const StyledContext = context ? `<yellow>[<r><magenta>${formattedContext}<r><yellow>]<r>` : "";

    return `${styledTimestamp} ${styledSource} ${styledLevel()} > ${styledMessage}${StyledContext}`;
}

function stripColors(message: string): string {
    const _message = parseUsing24BitColors(message);
    // eslint-disable-next-line no-control-regex
    return _message.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, "");
}

function pushToConsole(payload: Payload): void {
    const message = formatMessage(payload);

    console[payload.level](parseUsing24BitColors(message));
}

async function pushToDatabase(payload: Payload): Promise<void> {
    try {
        const _payload = payload;

        _payload.message = stripColors(payload.message);

        await prismaClient.log.create({
            data: {
                payload: JSON.stringify(_payload)
            }
        });
    } catch (error) {
        await useLogger("error", "Failed logging to Database.", JSON.stringify(error));
    }
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
