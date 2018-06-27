import chalk from "chalk";
import { ISmokeTestLogger } from './interfaces';

export class DefaultLogger implements ISmokeTestLogger
{
    log(...args)
    {
        const [format, ...rest] = args;
        console.log(
            `${chalk.grey('[Advanced Smoke]:')}${
            typeof format === 'string' ? ` ${format.replace(/%[^%]/g, seq => chalk.magenta(seq))}` : ''
            }`,
            ...(typeof format === 'string' ? [] : [format]).concat(rest)
        );
    }

    error(...args)
    {
        const [format, ...rest] = args;
        console.error(
            `${chalk.grey('[Advanced Smoke]:')}${typeof format === 'string' ? ` ${chalk.red(format)}` : ''}`,
            ...(typeof format === 'string' ? [] : [format]).concat(rest)
        );
    }
}