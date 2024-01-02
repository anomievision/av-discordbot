export async function useVersion(): Promise<string> {
    const packageJson = await Bun.file(`${process.cwd()}/package.json`).json() as { version: string };
    return packageJson.version;
}
