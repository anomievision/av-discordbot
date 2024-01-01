import { useLogger } from "#utils";
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

        await useLogger(
            "info",
            "command::interaction",
            `Guild: ${interaction.data.guildId} | Channel: ${interaction.data.targetId} | User: ${interaction.message} | Command: /${interaction.data.name}`
        );
    }
} satisfies SlashCommand;
