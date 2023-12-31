import { startClient } from "./client.js";
import { createLock, exitTasks, removeLock, startupTasks } from "@utils";

process.on("unhandledRejection", console.error);
process.on("uncaughtException", console.error);

await createLock();
await startupTasks();
await startClient();

process.on("SIGINT", async () => {
    console.log("Stopping bot...");
    await exitTasks();
    await removeLock();

    process.exit(0);
});
