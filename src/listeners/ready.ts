import { useLogger } from "utils/useLogger.js";
import type { Event } from "@lilybird/handlers";

export default {
    event: "ready",
    run: async (client) => {
        await useLogger("info", "discord::listener::ready", `Logged in as ${client.user.username}`);
    }
} satisfies Event<"ready">;
