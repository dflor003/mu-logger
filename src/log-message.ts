import {LogLevel} from './log-levels';

export interface ILogMessage {
    id: string;
    timestamp: moment.Moment;
    namespace: string;
    level: LogLevel;
    message: any[];
    data?: Object;
}