import { PrismaClient } from "@prisma/client";

/**
 * Represents the Prisma Client instance.
 */
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

    /**
     * Private constructor to create a new instance of PrismaService.
     * Initializes the PrismaClient with appropriate logging based on the environment.
     */
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

    /**
     * Gets the singleton instance of PrismaService.
     *
     * @returns The PrismaService instance.
     */
    public static getInstance(): PrismaService {
        if (!PrismaService._instance)
            PrismaService._instance = new PrismaService();

        return PrismaService._instance;
    }

    /**
     * Gets the PrismaClient instance from the PrismaService.
     *
     * @returns The PrismaClient instance.
     */
    public get prisma(): PrismaClient {
        return this._prisma;
    }
}

const prismaService = PrismaService.getInstance();

/**
 * The PrismaClient instance.
 */
export const prismaClient = prismaService.prisma;
