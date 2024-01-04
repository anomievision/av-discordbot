declare global {
    namespace Logger {
        type LogLevels = "log" | "debug" | "info" | "warn" | "error";
        
        interface Payload {
            timestamp: number;
            category: string;
            level: LogLevels;
            message: string;
            context?: string;
        }
    }
}

export { };