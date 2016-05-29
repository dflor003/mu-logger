export class LogLevel {
    name: string;
    priority: number;

    constructor(name: string, priority: number) {
        this.name = name;
        this.priority = priority;
    }

    equals(other: LogLevel): boolean {
        if (!other) {
            return false;
        }

        return this.name.toLowerCase() === other.name.toLowerCase();
    }
}

export const Levels = {
    Trace: new LogLevel('trace', 10),
    Debug: new LogLevel('debug', 20),
    Log: new LogLevel('log', 30),
    Info: new LogLevel('info', 40),
    Success: new LogLevel('success', 50),
    Warn: new LogLevel('warn', 60),
    Error: new LogLevel('error', 70),
    Fatal: new LogLevel('fatal', 80),
};

export const AllLevels = [
    Levels.Trace,
    Levels.Debug,
    Levels.Log,
    Levels.Info,
    Levels.Success,
    Levels.Warn,
    Levels.Error,
    Levels.Fatal
];