export async function getVersion(): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const packageJson = await Bun.file(`${process.cwd()}/package.json`).json() as { version: string };
    return packageJson.version;
}
