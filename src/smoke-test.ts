import * as request from "request-promise";

import { ISmokeTestOptions, ISmokeTestLogger } from "./interfaces";
import { DefaultLogger } from "./default-logger";

export async function smokeTest(opts: ISmokeTestOptions, logger?: ISmokeTestLogger): Promise<boolean>
{
    logger = logger || new DefaultLogger();

    logger.log("testing url", opts.url);

    let res = await request(opts);

    if (res.statusCode === opts.status)
    {
        logger.log("statusCode", res.statusCode, ", expected", opts.status);
    }
    else
    {
        logger.error("statusCode", res.statusCode, ", expected", opts.status);
        return false;
    }

    return true;
}