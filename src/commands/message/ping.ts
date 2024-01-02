export default {
    name: "ping",
    run: async (message) => {
        const _message = await message.reply({
            content: "🏓..."
        });

        const { ws, rest } = await message.client.ping();

        await _message.edit({
            content: `🏓 WebSocket: \`${ws}ms\` | Rest: \`${rest}ms\``
        });
    }
} satisfies Handlers.MessageCommand;
