import { ApplicationCommandType } from "lilybird";
import type { SlashCommand } from "@lilybird/handlers";

// TODO: Add logger
export default {
    post: "GLOBAL",
    data: {
        type: ApplicationCommandType.CHAT_INPUT,
        name: "refresh-embeds",
        description: "Refreshes the embeds in each channel."
    },
    run: async (interaction) => {
        await interaction.deferReply(true);

        await interaction.editReply({
            content: ""
        });
    }
} satisfies SlashCommand;
