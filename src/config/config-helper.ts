import {ILogAdapter} from '../loggers/log-adapter';
import {ILogMessage} from '../log-message';
import {configManager} from './config-manager';
import {MuLoggerError} from '../common/mu-logger-error';

export interface IConfigHelper {
    useAdapter(logFunction: (message: ILogMessage) => void|Promise<void>): this;
    useAdapter(adapter: ILogAdapter): this;
}

export class ConfigHelper implements IConfigHelper {
    private configName: string;

    constructor(configName: string) {
        this.configName = configName || null;
    }

    useAdapter(adapter: any): this {
        const config = configManager.declareConfig(this.configName);
        if (typeof adapter === 'function') {
            config.addAdapter({
                log: adapter
            });
        } else if (adapter && typeof adapter['log'] === 'function') {
            config.addAdapter(adapter);
        } else {
            throw new MuLoggerError('Invalid adapter. Adapters must be a function or an object with a log function');
        }

        return this;
    }
}