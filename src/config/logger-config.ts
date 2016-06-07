import {ILogMiddleware} from './middleware';
import {ILogAdapter} from '../loggers/log-adapter';

export class LoggerConfig {
    private name: string;

    middleware: ILogMiddleware[] = [];
    adapters: ILogAdapter[] = [];

    constructor(name: string) {
        this.name = name;
    }

    addMiddleware(middleware: ILogMiddleware): this {
        this.middleware.push(middleware);
        return this;
    }

    addAdapter(adapter: ILogAdapter): this {
        this.adapters.push(adapter);
        return this;
    }
}