#!/usr/bin/env node

import * as yargs from "yargs";
import * as smoke from "../dist";

const logger = new smoke.DefaultLogger();

// TODO: validate args

let urls = yargs.argv._;
let opts = {
    url: null,
    status: parseInt(yargs.argv.status, 10) || 200,
    method: yargs.argv.method || "GET",
    timeout: yargs.argv.timeout || null,
    resolveWithFullResponse: true
};

logger.log("initialize smoke test")
logger.log(opts);

(async (urls, opts) =>
{
    let error = false;

    for (let url of urls)
    {
        opts.url = url;

        try
        {
            error = await smoke.smokeTest(opts, logger) || error;
        }
        catch (e)
        {
            logger.error(e.message);
            error = true;
        }
    }

    process.exit(error ? 1 : 0);

})(urls, opts);
