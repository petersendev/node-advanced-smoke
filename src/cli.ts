import * as yargs from "yargs";
import { DefaultLogger } from "./default-logger";
import { smokeTest } from "./smoke-test";

export async function cli(processArgs: string[])
{
    const logger = new DefaultLogger();

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
            type: "boolean",
            default: true
        })
        .option("noExitCode", {
            desc: "Doesn't exit the process",
            alias: "ne",
            type: "boolean",
            default: false
        })
        .option("strictSSL", {
            desc: "Whether SSL certificates are required to be valid",
            type: "boolean",
            default: true
        })
        .option("proxy", {
            desc: "Proxy server to use for the request.\nHTTP(S)_PROXY, NO_PROXY and ADVANCED_SMOKE_PROXY environment variables are also supported",
            alias: "p",
            type: "string"
        })
        .alias("h", "help")
        .help()
        .showHelpOnFail(true)
        .parse(processArgs.slice(2, processArgs.length));

    let urls = argv._;

    logger.log("initialize smoke test");

    let error = false;

    for (let url of urls)
    {
        const opts = {
            url: url,
            status: argv.status,
            method: argv.method,
            timeout: argv.timeout,
            resolveWithFullResponse: argv.resolveWithFullResponse,
            headers: argv.headers,
            strictSSL: argv.strictSSL,
            proxy: argv.proxy
        }

        try
        {
            error = !await smokeTest(opts, logger) || error;
        }
        catch (e)
        {
            logger.error(e.message);
            error = true;
        }
    }

    if (!argv.noExitCode)
    {
        process.exit(error ? 1 : 0);
    }
    else
    {
        return error ? 1 : 0;
    }
}