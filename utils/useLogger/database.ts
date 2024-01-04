import { useLogger, useSupabaseServiceClient } from "#utils";

export async function pushToDatabase(payload: Logger.Payload): Promise<void> {
    try {
        const { error } = await useSupabaseServiceClient()
            .schema("discord")
            .from("log")
            .insert({
                timestamp: payload.timestamp.toString(),
                category: payload.category,
                level: payload.level,
                message: payload.message,
                context: payload.context
            })
            .select();

        if (error)
            // eslint-disable-next-line @typescript-eslint/no-throw-literal
            throw error;
    } catch (error) {
        await useLogger("error", "logger", "Failed logging to Database.", JSON.stringify(error));
    }
}
