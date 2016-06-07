import {coalesce, uuid, moment} from './common/utils';
import {AllLevels} from './log-levels';
import {LogProcessor} from './log-processor';

export interface ILogger {
    trace(tags: string[], message: string, data?: Object): void;
    trace(message: string, data?: Object): void;
    debug(tags: string[], message: string, data?: Object): void;
    debug(message: string, data?: Object): void;
    log(tags: string[], message: string, data?: Object): void;
    log(message: string, data?: Object): void;
    info(tags: string[], message: string, data?: Object): void;
    info(message: string, data?: Object): void;
    success(tags: string[], message: string, data?: Object): void;
    success(message: string, data?: Object): void;
    warn(tags: string[], message: string, data?: Object): void;
    warn(message: string, data?: Object): void;
    error(tags: string[], message: string, data?: Object): void;
    error(message: string, data?: Object): void;
    fatal(tags: string[], message: string, data?: Object): void;
    fatal(message: string, data?: Object): void;
}

export class Logger {
    private configName: string;
    private namespace: string;

    constructor(configName: string, namespace?: string) {
        this.namespace = coalesce(namespace, null);
        this.configName = configName;
    }

    static create(namespace?: string, config?: string): ILogger {
        config = config || null;
        namespace = namespace || null;
        return new Logger(config,  namespace) as any;
    }
}

AllLevels.forEach(level => {
    Logger.prototype[level.name] = function (): void {
        let config = this.configName,
            namespace = this.namespace,
            args: IArguments = arguments,
            message: string = undefined,
            tags: string[] = undefined,
            data: Object = undefined,
            timestamp = moment();

        if (!args.length) {
            throw new Error('[Logger] No arguments specified for log function. ' +
                `Signature is: logger.${level}(tags: string[], message: string, data: Object) or ` +
                `logger.${level}(message: string, object: Object)`);
        }

        if (args[0] instanceof Array) {
            tags = args[0];
            message = args[1] || null;
            data = args [2] || null;
        } else {
            tags = [];
            message = args[0];
            data = args [2];
        }

        LogProcessor.instance.process(config, {
            id: uuid(),
            timestamp: timestamp,
            namespace: namespace,
            level: level,
            tags: tags,
            message: message,
            data: data,
        });
    };
});