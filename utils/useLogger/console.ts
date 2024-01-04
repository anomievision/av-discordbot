import {
    parseUsing24BitColors
} from "tasai";

const timeFormatter = Intl.DateTimeFormat("en-US", { dateStyle: "short", timeStyle: "medium", timeZone: "america/chicago" });

export function print(payload: Logger.Payload): void {
    const { timestamp, category, level, message, context } = payload;
    const time = timeFormatter.format(timestamp).replaceAll(",", " -");

    const formattedContext = context ? ` [${context}]` : "";

    const styledTimestamp = `<#D95F80>[<r><#8B8B8C>${time}<r><#D95F80>]<r>`;
    const styledCategory = `<#D95F80>[<r><#9794F2>${category.toLocaleUpperCase()}<r><#D95F80>]<r>`;
    const styledSeparator = "<#D95F80>>><r>";
    const styledMessage = `${message}`;
    const styledContext = context ? `<#9794F2>${formattedContext}<r>` : "";

    const staticLog = parseUsing24BitColors(`${styledTimestamp} ${styledCategory} %s ${styledSeparator} ${styledMessage}${styledContext}`);

    const formattedLevel = level.toUpperCase(); // why not just make them caps by default an use an enum then??
    switch (level) {
        case "debug": {
            console.debug(staticLog, parseUsing24BitColors(`<#F252AA>${formattedLevel}<r>`));
            break;
        }
        case "info": {
            console.info(staticLog, parseUsing24BitColors(`<#6EC9FA>${formattedLevel}<r>`));
            break;
        }
        case "warn": {
            console.warn(staticLog, parseUsing24BitColors(`<#FFFC66>${formattedLevel}<r>`));
            break;
        }
        case "error": {
            console.error(staticLog, parseUsing24BitColors(`<#FA5A6A>${formattedLevel}<r>`));
            break;
        }
        default: {
            console.log(staticLog, parseUsing24BitColors(`<#59E37B>${formattedLevel}<r>`));
            break;
        }
    }
}
