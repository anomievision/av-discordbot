import { startClient } from "./client.js";
import { createLock, removeLock, useExitChecks, useStartupChecks } from "@utils";

process.on("unhandledRejection", console.error);
process.on("uncaughtException", console.error);

await createLock();
await useStartupChecks();
await startClient();

process.on("SIGINT", async () => {
    console.log("Stopping bot...");
    await useExitChecks();
    await removeLock();

    process.exit(0);
});
