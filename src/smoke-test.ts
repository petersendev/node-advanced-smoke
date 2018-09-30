import * as request from "request-promise";

import { ISmokeTestOptions, ISmokeTestLogger } from "./interfaces";
import { DefaultLogger } from "./default-logger";

export async function smokeTest(opts: ISmokeTestOptions, logger?: ISmokeTestLogger): Promise<boolean>
{
    logger = logger || { log: () => { }, error: () => { } };

    logger.log("testing url", opts.url);

    let res: any;
    try
    {
        res = await request(opts.url, {
            method: opts.method,
            timeout: opts.timeout,
            headers: opts.headers,
            resolveWithFullResponse: opts.resolveWithFullResponse,
            strictSSL: opts.strictSSL,
            proxy: opts.proxy || process.env.ADVANCED_SMOKE_PROXY
        });
    }
    catch (e)
    {
        if (typeof e.statusCode !== "undefined")
        {
            res = e;
        }
        else
        {
            throw e;
        }
    }

    if (res.statusCode === opts.status)
    {
        logger.log(`SUCCESS: received status code ${res.statusCode}, expected ${opts.status}`);
    }
    else
    {
        logger.error(`FAILURE: received status code ${res.statusCode}, expected ${opts.status}`);
        return false;
    }

    return true;
}