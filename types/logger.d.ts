declare global {
    namespace Logger {
        interface Payload {
            timestamp: string;
            source: string;
            level: "log" | "debug" | "info" | "warn" | "error";
            message: string;
            context?: string;
        }
    }
}

export { };