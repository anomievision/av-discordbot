import { PrismaClient } from "@prisma/client";

class PrismaService {
    private static _instance: PrismaService | null = null;
    private readonly _prisma: PrismaClient<{
        log: Array< | {
            emit: "event",
            level: "query"
        }
                | {
                    emit: "stdout",
                    level: "error"
                }
                | {
                    emit: "stdout",
                    level: "info"
                }
                | {
                    emit: "stdout",
                    level: "warn"
                }>
    }>;

    private constructor() {
        this._prisma = new PrismaClient({
            log:
                process.env.NODE_ENV === "development"
                    ? [
                        { emit: "event", level: "query" },
                        { emit: "stdout", level: "error" },
                        { emit: "stdout", level: "info" },
                        { emit: "stdout", level: "warn" }
                    ]
                    : []
        });

        if (process.env.NODE_ENV === "development") {
            this._prisma.$on("query", (_event: any) => {
                // consola("log", "Query: " + event.query);
                // consola("log", "Params: " + event.params);
                // consola("log", "Duration: " + event.duration + "ms");
            });
        }
    }

    public static getInstance(): PrismaService {
        if (!PrismaService._instance)
            PrismaService._instance = new PrismaService();

        return PrismaService._instance;
    }

    public get prisma(): PrismaClient {
        return this._prisma;
    }
}

const prismaService = PrismaService.getInstance();

export const usePrismaClient = prismaService.prisma;
