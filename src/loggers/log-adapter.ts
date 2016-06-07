import {ILogMessage} from '../log-message';

export interface ILogAdapter {
    log(message: ILogMessage): void|Promise<void>;
}