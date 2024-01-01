import { useLogger } from "#utils";

export async function useScheduledTasks(): Promise<void> {
    await useLogger("info", "scheduled", "Starting scheduled tasks");
}
