import { useLogger } from "#utils";

export async function useVersion(): Promise<string> {
    try {
        const packageJson = await Bun.file(`${process.cwd()}/package.json`).json() as { version: string };
        return packageJson.version;
    } catch (error: unknown) {
        const _error = "Unable to load package.json";

        await useLogger("error", "useVersion", _error);

        throw new Error(_error);
    }
}
