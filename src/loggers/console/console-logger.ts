import {
    IConsoleLogConfig, DefaultConsoleConfig, IConsoleColorTheme, IConsoleLevelMapping,
    DefaultConsoleLevelMapping
} from './config';

import {Utils} from '../../common/utils';
import {ILogMessage} from '../../log-message';

const coalesce = Utils.coalesce;

export class ConsoleLogger {
    private colorize: boolean;
    private theme: IConsoleColorTheme;
    private levelMap: IConsoleLevelMapping;

    constructor(config?: IConsoleLogConfig) {
        config = config || {};
        this.colorize = coalesce(config.colorize, DefaultConsoleConfig.colorize);
        this.theme = coalesce(config.theme, <any>{});
        this.levelMap = coalesce(config.levelMappings, <any>{});
        this.colorizeText = this.colorizeText.bind(this);
    }

    async log(msg: ILogMessage): Promise<void> {
        let colorize = this.colorizeText;
        let level = msg.level.name;
        let message = msg.message.map(arg => typeof arg === 'string' ? colorize(level, arg) : arg);
        let timestampText = msg.timestamp.format('MM-DD-YYYY HH:mm:ss.SSS');
        let timestamp = colorize('timestamp', `[${timestampText}]`);
        let logNamespace = msg.namespace ? colorize('namespace', `[${msg.namespace}]`) : null;
        let levelName = colorize(level, `[${level.toUpperCase()}]`);
        let logFunc = this.getLogFunc(level);

        if (logNamespace) {
            logFunc.call(console, timestamp, logNamespace, levelName, ...message);
        } else {
            logFunc.call(console, timestamp, levelName, ...message);
        }
    }

    private colorizeText(themeItem: string, text: string): string {
        if (!this.colorize) {
            return text;
        }

        let formatter = this.theme[themeItem] || DefaultConsoleConfig.theme[themeItem];
        if (!formatter) {
            throw new Error(`No property in theme for item '${themeItem}'`);
        }

        return formatter(text);
    }

    private getLogFunc(name: string) {
        let logFunc = this.levelMap[name] || DefaultConsoleLevelMapping[name];
        if (!logFunc) {
            throw new Error(`Could not find log func for '${name}'`);
        }

        return logFunc;
    }
}