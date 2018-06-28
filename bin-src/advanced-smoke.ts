#!/usr/bin/env node

import * as yargs from "yargs";
import * as smoke from "../dist";

const logger = new smoke.DefaultLogger();

const argv = yargs
    .usage("Usage: $0 <url> [<url2> <url3> ...] [options]")
    .option("status", {
        desc: "HTTP status to validate",
        alias: "s",
        default: 200,
        type: "number"
    })
    .option("method", {
        desc: "HTTP method",
        alias: "m",
        default: "GET",
        type: "string"
    })
    .option("headers", {
        desc: "Headers to send\nUse --headers.name value",
        type: "array"
    })
    .option("timeout", {
        desc: "Timeout",
        alias: "t",
        type: "number"
    })
    .option("resolveWithFullResponse", {
        desc: "Full request or just head",
        alias: "r",
        type: "boolean",
        default: true
    })
    .alias("h", "help")
    .help()
    .showHelpOnFail(true)
    .argv;

let urls = argv._;
let opts = {
    url: null,
    status: argv.status,
    method: argv.method,
    timeout: argv.timeout,
    resolveWithFullResponse: argv.resolveWithFullResponse,
    headers: argv.headers
};

logger.log("initialize smoke test");

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