import { useDatabaseServiceClient } from "#utils";
import { ApplicationCommandOptionType, ApplicationCommandType } from "lilybird";
import type { Database } from "av-database";

export default {
    post: "GLOBAL",
    data: {
        type: ApplicationCommandType.CHAT_INPUT,
        name: "logs",
        description: "Manage the bot's logs.",
        options: [
            {
                type: ApplicationCommandOptionType.SUB_COMMAND,
                name: "show",
                description: "Show the bot's logs.",
                options: [
                    {
                        type: ApplicationCommandOptionType.INTEGER,
                        name: "amount",
                        description: "The amount of logs to show.",
                        required: false,
                        max_value: 100,
                        min_value: 1
                    }
                ]
            }
        ]
    },
    run: async (interaction) => {
        await interaction.deferReply();

        const amount = interaction.data.getInteger("amount") ?? 10;

        const { data, error } = await useDatabaseServiceClient().discord.log.selectAll(amount);

        if (error) {
            await interaction.editReply({
                content: error.message
            });

            return;
        }

        const timeFormatter = Intl.DateTimeFormat("en-US", { dateStyle: "short", timeStyle: "medium", timeZone: "america/chicago" });

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        const content: string = data
            .map(({ timestamp, category, level, message, context }: Database.Discord.Log.Select) => {
                const _context = typeof context === "string" && context.length > 0 ? ` - ${context}` : "";

                return `${timeFormatter.format(parseInt(timestamp)).replaceAll(",", " -")} - ${category} - ${level} - ${message}${_context}`;
            })
            .join("\n");

        await interaction.editReply({
            content
        });
    }
} satisfies Handlers.SlashCommand;
