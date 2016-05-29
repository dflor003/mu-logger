import {ILogMessage} from '../log-message';

export interface ILogHandlerFunction {
    (message: ILogMessage): Promise<void>;
}

export interface ILogAdapter {
    log: ILogHandlerFunction;
}

export type LogAdapter = ILogAdapter | ILogHandlerFunction;