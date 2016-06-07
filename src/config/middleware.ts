import {ILogMessage} from '../log-message';

export interface ILogMiddleware {
    process(message: ILogMessage): void;
}

export type LogMiddlewareFunc = (message: ILogMiddleware) => void;
export type LogMiddleware = LogMiddlewareFunc | ILogMiddleware;
