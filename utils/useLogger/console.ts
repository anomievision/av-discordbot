import {
    parseUsing24BitColors
} from "tasai";

function formatMessage(payload: Logger.Payload): string {
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

export function pushToConsole(payload: Logger.Payload): void {
    const message = formatMessage(payload);

    console[payload.level](parseUsing24BitColors(message));
}
