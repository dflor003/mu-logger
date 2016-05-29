import * as colors from 'cli-color';
import {Format} from 'cli-color';
import {Levels} from '../../log-levels';

export interface IConsoleColorTheme {
    'timestamp'?: Format;
    'namespace'?: Format;
    [level: string]: Format;
}

export const DefaultColorTheme: IConsoleColorTheme = {
    // Supporting text
    'timestamp': colors.greenBright,
    'namespace': colors.greenBright,

    // Log levels
    [Levels.Trace.name]: colors.blackBright,
    [Levels.Debug.name]: colors.blackBright,
    [Levels.Info.name]: colors.blueBright,
    [Levels.Success.name]: colors.green,
    [Levels.Warn.name]: colors.yellow,
    [Levels.Error.name]: colors.redBright,
    [Levels.Fatal.name]: colors.redBright.bold.underline,
};

export interface IConsoleLevelMapping {
    [level: string]: Function;
}

export const DefaultConsoleLevelMapping: IConsoleLevelMapping = {
    [Levels.Trace.name]: console.debug,
    [Levels.Debug.name]: console.debug,
    [Levels.Info.name]: console.log,
    [Levels.Success.name]: console.log,
    [Levels.Warn.name]: console.warn,
    [Levels.Error.name]: console.error,
    [Levels.Fatal.name]: console.error,
}

export interface IConsoleLogConfig {
    colorize?: boolean;
    theme?: IConsoleColorTheme;
    levelMappings?: IConsoleLevelMapping;
}

export const DefaultConsoleConfig: IConsoleLogConfig = {
    colorize: true,
    theme: DefaultColorTheme,
    levelMappings: DefaultConsoleLevelMapping
};