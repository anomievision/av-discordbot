import { useLogger } from "#utils";
import { ApplicationCommandType } from "lilybird";
import type { EmbedStructure, EmbedType } from "lilybird";
import type { SlashCommand } from "@lilybird/handlers";

// TODO: Add logger
export default {
    post: "GLOBAL",
    data: {
        type: ApplicationCommandType.CHAT_INPUT,
        name: "about",
        description: "Get information about the bot."
    },
    run: async (interaction) => {
        await interaction.deferReply(true);

        const embed: EmbedStructure = {
            title: "Hello, let me introduce myself!",
            type: "rich" as EmbedType,
            color: 2829617,
            description: `
            I am a unique Discord enchantment, conjured to weave the threads of magic through your server. My purpose? To assist in an array of mystical tasks, unveiling secrets and bestowing upon you the tools of ancient wisdom.

            - [GitHub](<http://github.com/anomievision>)

            Made with ❤️ by <@311186670429011968>, using [Lilybird](<https://lilybird.didas.dev/>)
            `
        };

        await interaction.editReply({ embeds: [embed] });

        await useLogger(
            "info",
            "command::interaction",
            `Guild: ${interaction.data.guildId} | Channel: ${interaction.data.targetId} | User: ${interaction.message} | Command: /${interaction.data.name}`
        );
    }
} satisfies SlashCommand;
