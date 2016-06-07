import {LoggerConfig} from './logger-config';
import {ConsoleLogger} from '../loggers/console/console-logger';
import {MuLoggerError} from '../common/mu-logger-error';

const globalConfig = new LoggerConfig('global');
globalConfig.addAdapter(new ConsoleLogger());

const makeKey = (name: string) => name.toUpperCase();

export class ConfigManager {
    private namedConfig: { [name: string]: LoggerConfig; } = {};

    constructor() {
    }

    declareConfig(name: string): LoggerConfig {
        if (!name || !name.trim()) {
            throw new MuLoggerError('No config name passed');
        }

        const key = makeKey(name);
        return this.namedConfig[key] || (this.namedConfig[key] = new LoggerConfig(name));
    }

    getConfig(name?: string): LoggerConfig {
        if (!name) {
            return globalConfig;
        }

        const key = makeKey(name);
        let config = this.namedConfig[key];
        if (!config) {
            throw new MuLoggerError(`[LOGGER] No config with name ${name}`);
        }

        return config;
    }

    reset(): void {
        this.namedConfig = {};
    }
}

export const configManager = new ConfigManager();

configManager.declareConfig('internal')
    .addAdapter(new ConsoleLogger());