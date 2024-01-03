import { useLogger, useSupabaseServiceClient } from "#utils";
import {
    parseUsing24BitColors
} from "tasai";

function stripColors(message: string): string {
    const _message = parseUsing24BitColors(message);
    // eslint-disable-next-line no-control-regex
    return _message.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, "");
}

export async function pushToDatabase(payload: Logger.Payload): Promise<void> {
    try {
        const _payload = payload;

        _payload.message = stripColors(payload.message);

        const { error } = await useSupabaseServiceClient()
            .schema("discord")
            .from("log")
            .insert({
                timestamp: payload.timestamp.toDateString(),
                source: payload.source,
                level: payload.level,
                message: payload.message,
                context: payload.context
            })
            .select();

        if (error)
            throw new Error(error.message);
    } catch (error) {
        await useLogger("error", "Failed logging to Database.", JSON.stringify(error));
    }
}
