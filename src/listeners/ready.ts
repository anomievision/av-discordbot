import { useLogger } from "@utils";
import type { Event } from "@lilybird/handlers";

// TODO: Add logger
export default {
    event: "ready",
    run: async (client) => {
        await useLogger("info", "discord::listener::ready", `Logged in as ${client.user.username}`);
    }
} satisfies Event<"ready">;
