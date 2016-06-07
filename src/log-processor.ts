import {configManager as cfg} from './config/config-manager';
import {ILogMessage} from './log-message';
import {ConfigManager} from './config/config-manager';
import {LoggerConfig} from './config/logger-config';
import {Logger, ILogger} from './logger';

let instance: LogProcessor;

export class LogProcessor {
    private configManager: ConfigManager;
    private logger: ILogger;

    constructor(configManager?: ConfigManager) {
        this.configManager = configManager || cfg;
        this.logger = Logger.create('MU-LOGGER', 'internal');
    }

    static get instance(): LogProcessor {
        return instance || (instance = new LogProcessor());
    }

    process(configName: string, message: ILogMessage): void {
        const config = this.configManager.getConfig(configName);
        this.applyMiddleware(config, message);
        this.applyAdapters(config, message);
    }

    applyMiddleware(config: LoggerConfig, message: ILogMessage): void {
        // Apply all middleware to log message
        const middleware = config.middleware;
        const logger = this.logger;
        for (let i = 0; i < middleware.length; i++) {
            const current = middleware[i];
            try {
                current.process(message);
            } catch (err) {
                logger.error(['MU-MIDDLEWARE-ERR'], `Error occurred inside a middleware`, err);
                throw err; // TODO: Config option to swallow errors in middleware?
            }
        }
    }

    applyAdapters(config: LoggerConfig, message: ILogMessage): void {
        // Delegate handling of messages to adapters
        // TODO: Convert to "trigger"-based model
        const adapters = config.adapters;
        const logger = this.logger;
        for (let i = 0; i < adapters.length; i++) {
            const current = adapters[i];
            let promise: Promise<void> = null;

            // Try to log via the adapter
            try {
                promise = <any>current.log(message);
            } catch (err) {
                logger.error(['MU-PROCESS-ERR'], `Adapter failed to process message. Error: ${err.message}`, err);
                continue;
            }

            // If not a promise continue on
            if (!promise) {
                continue;
            }

            // If not a proper "thenable", log a warning
            if (typeof promise.then !== 'function' || typeof promise.catch !== 'function') {
                logger.warn(['MU-PROCESS-ERR'], `Log adapter returned a non-promise. Did you mean to return a promise?`);
                continue;
            }

            // Track the promise
            promise.catch(err => logger.error(['MU-PROCESS-ERR'], `Adapter failed to process message. Error: ${err.message}`, err));
        }
    }
}