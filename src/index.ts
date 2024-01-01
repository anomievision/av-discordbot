import { startClient } from "./client.js";
import { createLock, removeLock, useExitTasks, useStartupTasks } from "#utils";

process.on("unhandledRejection", console.error);
process.on("uncaughtException", console.error);

await createLock();
await useStartupTasks();
await startClient();

process.on("SIGINT", async () => {
    console.log("Stopping bot...");
    await useExitTasks();
    await removeLock();

    process.exit(0);
});
