export interface ISmokeTestOptions
{
    url: string;
    status: number;
    method: string;
    timeout: number;
    resolveWithFullResponse: boolean;
    strictSSL: boolean;
    headers?: { [key: string]: any };
    proxy?: string
}

export interface ISmokeTestLogger
{
    log(...args: any[]);
    error(...args: any[]);
}
