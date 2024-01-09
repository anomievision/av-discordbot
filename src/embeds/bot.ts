export default {
    name: "#bot",
    channelId: "1192318477302771772",
    enabled: true,
    embeds: [
        {
            title: "Automated Embed 1",
            description: "This is an automated embed.",
            url: "",
            timestamp: new Date().getTime().toString(),
            color: 0x2b2d31,
            footer: {
                text: "",
                icon_url: "",
                proxy_icon_url: ""
            },
            image: {
                url: "",
                proxy_url: "",
                height: 0,
                width: 0
            },
            thumbnail: {
                url: "",
                proxy_url: "",
                height: 0,
                width: 0
            },
            video: {
                url: "",
                proxy_url: "",
                height: 0,
                width: 0
            },
            provider: {
                name: "",
                url: ""
            },
            author: {
                name: "",
                url: "",
                icon_url: "",
                proxy_icon_url: ""
            },
            fields: [
                {
                    name: "",
                    value: "",
                    inline: false
                }
            ]
        }
    ]
} satisfies Handlers.AutoEmbed;
