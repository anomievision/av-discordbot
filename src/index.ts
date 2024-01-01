import { startClient } from "./client.js";
import { createLock, removeLock, useExitTasks, useStartupTasks } from "#utils";
import { useScheduledTasks } from "utils/useTasks/scheduled.js";

process.on("unhandledRejection", console.error);
process.on("uncaughtException", console.error);

await createLock();
await useStartupTasks();
await startClient();
await useScheduledTasks();

process.on("SIGINT", async () => {
    await useExitTasks();
    await removeLock();

    process.exit(0);
});
