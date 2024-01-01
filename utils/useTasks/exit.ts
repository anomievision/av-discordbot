import { useLogger } from "#utils";

export async function useExitTasks(): Promise<void> {
    await useLogger("info", "exit", "Exiting process");
}
