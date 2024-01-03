import {
    parseUsing24BitColors
} from "tasai";

function formatMessage(payload: Logger.Payload): string {
    const { timestamp, source, level, message, context } = payload;

    const time = Intl.DateTimeFormat("en-US", { dateStyle: "short", timeStyle: "medium", timeZone: "america/chicago" }).format(timestamp).replaceAll(",", " -");

    const formattedLevel = level.toUpperCase();
    const formattedContext = context ? ` [${context}]` : "";

    const styledTimestamp = `<#D95F80>[<r><#8B8B8C>${time}<r><#D95F80>]<r>`;
    const styledSource = `<#D95F80>[<r><#9794F2>${source.toLocaleUpperCase()}<r><#D95F80>]<r>`;
    const styledLevel = (): string => {
        switch (level) {
            case "log":
                return `<#59E37B>${formattedLevel}<r>`;
            case "debug":
                return `<#F252AA>${formattedLevel}<r>`;
            case "info":
                return `<#6EC9FA>${formattedLevel}<r>`;
            case "warn":
                return `<#FFFC66>${formattedLevel}<r>`;
            case "error":
                return `<#FA5A6A>${formattedLevel}<r>`;
        }
    };
    const styledSeparator = "<#D95F80>>><r>";
    const styledMessage = `${message}`;
    const StyledContext = context ? `<#9794F2>${formattedContext}<r>` : "";

    return `${styledTimestamp} ${styledSource} ${styledLevel()} ${styledSeparator} ${styledMessage}${StyledContext}`;
}

export function pushToConsole(payload: Logger.Payload): void {
    const message = formatMessage(payload);

    console[payload.level](parseUsing24BitColors(message));
}
