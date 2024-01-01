import { useLogger } from "#utils";
import { describe, test } from "bun:test";

describe(
    "Bot",
    () => {
        test(
            "logger",
            async () => {
                await useLogger("log", "discord", "Creating client...");
                await new Promise((resolve) => { setTimeout(resolve, 1000); });
                await useLogger("debug", "discord", "Debugging client...");
                await new Promise((resolve) => { setTimeout(resolve, 1000); });
                await useLogger("info", "discord", "Bot is online!");
                await new Promise((resolve) => { setTimeout(resolve, 1000); });
                await useLogger("warn", "discord", "This is a warning!");
                await new Promise((resolve) => { setTimeout(resolve, 1000); });
                await useLogger("error", "discord", "This is an error!");
            }
        );
    }
);
