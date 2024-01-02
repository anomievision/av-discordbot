import { startClient } from "./client.js";
import { useCreateLock, useRemoveLock, useExitTasks, useStartupTasks } from "#utils";
import { useScheduledTasks } from "utils/useTasks/scheduled.js";

process.on("unhandledRejection", console.error);
process.on("uncaughtException", console.error);

await useCreateLock();
await useStartupTasks();
await startClient();
await useScheduledTasks();

process.on("SIGINT", async () => {
    await useExitTasks();
    await useRemoveLock();

    process.exit(0);
});
