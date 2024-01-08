import { useLogger, useDatabaseServiceClient } from "#utils";

export async function pushToDatabase(payload: Logger.Payload): Promise<void> {
    try {
        const { error } = await useDatabaseServiceClient().discord.log.insert({
            timestamp: payload.timestamp.toString(),
            category: payload.category,
            level: payload.level,
            message: payload.message,
            context: payload.context
        });

        if (error)
            // eslint-disable-next-line @typescript-eslint/no-throw-literal
            throw error;
    } catch (error) {
        await useLogger("error", "logger", "Failed logging to Database.", JSON.stringify(error));
    }
}
