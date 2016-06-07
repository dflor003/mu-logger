export class MuLoggerError extends Error {
    constructor(message: string) {
        super(`[MU-LOGGER] ${message}`);
    }
}