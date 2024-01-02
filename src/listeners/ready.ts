import { useLogger } from "#utils";

export default {
    event: "ready",
    run: async (client) => {
        await useLogger("info", "listeners::ready", `Logged in as ${client.user.username}`);
    }
} satisfies Handlers.Event<"ready">;
