
export function getUptime(): string {
    const uptime = process.uptime();

    const days = Math.floor(uptime / 86400);
    const hours = Math.floor(uptime / 3600) % 24;
    const minutes = Math.floor(uptime / 60) % 60;
    const seconds = Math.floor(uptime % 60);

    return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
}

export async function getVersion(): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const packageJson = await Bun.file(`${process.cwd()}/package.json`).json() as { version: string };
    return packageJson.version;
}
