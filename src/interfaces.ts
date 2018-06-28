export interface ISmokeTestOptions
{
    url: string;
    status: number;
    method: string;
    timeout: number;
    resolveWithFullResponse: boolean;
    headers?: { [key: string]: any };
}

export interface ISmokeTestLogger
{
    log(...args: any[]);
    error(...args: any[]);
}
