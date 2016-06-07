import {ILogger, Logger} from './logger';
import {MuLoggerError} from './common/mu-logger-error';
import {IConfigHelper, ConfigHelper} from './config/config-helper';

export class LogManager {
    logger(namespace?: string, config?: string): ILogger {
        return Logger.create(namespace, config);
    }

    config(configName: string, configFunc: (cfg: IConfigHelper) => void): this;
    config(configFunc: (cfg: IConfigHelper) => void): this;
    config(arg: any): this {
        const args = arguments;

        if (arguments.length === 1 && typeof args[0] === 'function') {
            args[0](new ConfigHelper(null));
        } else if (arguments.length === 2 && typeof args[0] === 'string' && typeof args[1] === 'function') {
            args[1](new ConfigHelper(args[0]));
        } else {
            throw new MuLoggerError('No arguments passed to config. Pass either config name followed by config' +
                ' function or just the config function.');
        }

        return this;
    }
}