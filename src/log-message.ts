import {LogLevel} from './log-levels';

export interface ILogMessage {
    id: string;
    timestamp: moment.Moment;
    namespace: string;
    level: LogLevel;
    tags: string[];
    message: string;
    data?: Object;
}