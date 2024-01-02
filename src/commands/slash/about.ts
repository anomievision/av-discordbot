import { ApplicationCommandType } from "lilybird";
import type { EmbedStructure } from "lilybird";

export default {
    post: "GLOBAL",
    data: {
        type: ApplicationCommandType.CHAT_INPUT,
        name: "about",
        description: "Get information about the bot."
    },
    run: async (interaction) => {
        const embed: EmbedStructure = {
            title: "Hello, let me introduce myself!",
            color: 0x2b2d31,
            description: `
            I am a unique Discord enchantment, conjured to weave the threads of magic through your server. My purpose? To assist in an array of mystical tasks, unveiling secrets and bestowing upon you the tools of ancient wisdom.

            - [GitHub](<http://github.com/anomievision>)

            Made with ❤️ by <@311186670429011968>, using [Lilybird](<https://lilybird.didas.dev/>)
            `
        };

        await interaction.reply({ embeds: [embed], ephemeral: true });
    }
} satisfies Handlers.SlashCommand;
