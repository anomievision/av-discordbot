import { useDatabaseServiceClient } from "#utils";
import { ApplicationCommandOptionType, ApplicationCommandType } from "lilybird";
import type { EmbedStructure } from "lilybird";

export default {
    post: "GLOBAL",
    data: {
        type: ApplicationCommandType.CHAT_INPUT,
        name: "get-beta-access-code",
        description: "Get a beta access code.",
        options: [
            {
                type: ApplicationCommandOptionType.STRING,
                name: "email",
                description: "The email to send the beta access code to.",
                required: true
            }
        ]
    },
    run: async (interaction) => {
        await interaction.deferReply(true);

        const email = interaction.data.getString("email");
        let discordId = null;

        if (interaction.inGuild())
            discordId = interaction.member.user.id;

        if (!email) {
            await interaction.editReply({
                content: "Please provide an email to send the beta access code to."
            });
            return;
        }

        if (!discordId) {
            await interaction.editReply({
                content: "You must be in the AnomieVision Discord server to get a beta access code."
            });
            return;
        }

        const { data, error } = await useDatabaseServiceClient().private.license.createFromDiscordBot({
            email,
            discordId
        });

        if (error) {
            await interaction.editReply({
                content: "An error occurred while getting your beta access code."
            });
            return;
        }

        // Put additional details such as how many linked devices, how many beta codes in use, reset beta code, etc.
        const embed: EmbedStructure = {
            color: 0x2b2d31,
            title: "Beta Access Code",
            description: `Your beta access code \`${data?.licenseKey}\` has been linked to: \`${data?.email}\`.`
        };

        await interaction.editReply({
            embeds: [embed]
        });
    }
} satisfies Handlers.SlashCommand;
