import { cli } from "../src/cli";
import { smokeTest } from "../src/smoke-test";
import { ISmokeTestOptions } from "../src/interfaces";
import { DefaultLogger } from "../src/default-logger";

jest.mock("../src/default-logger.ts", () =>
{
    return {
        DefaultLogger: jest.fn().mockImplementation(() =>
        {
            return {
                log: jest.fn(),
                error: jest.fn(),
            };
        })
    };
});

jest.mock("../src/smoke-test", () =>
{
    return {
        smokeTest: jest.fn((opts, logger) => { return Promise.resolve(true); })
    };
});

const mockSmokeTest = <jest.Mock>smokeTest;

const getCliArgs = (...args) =>
{
    return ["", ""].concat(args).concat(["--noExitCode", "true"]);
}

describe("the cli", () =>
{
    beforeEach(() =>
    {
        mockSmokeTest.mockClear();
    });

    it("should call smokeTest with the expected parameters for a single url and no options", async () =>
    {
        const res = await cli(getCliArgs("https://google.com"));
        expect(res).toBe(0);
        expect(mockSmokeTest).toHaveBeenCalledTimes(1);

        let expected: ISmokeTestOptions = {
            url: "https://google.com",
            headers: undefined,
            method: "GET",
            resolveWithFullResponse: true,
            status: 200,
            timeout: undefined,
            strictSSL: true,
            proxy: undefined
        }

        expect(mockSmokeTest.mock.calls[0][0]).toEqual(expected);
    });

    it("should call smokeTest with the expected parameters for multiple urls and no options", async () =>
    {
        const res = await cli(getCliArgs("https://google.com", "https://github.com"));
        expect(res).toBe(0);

        expect(mockSmokeTest).toHaveBeenCalledTimes(2);

        let expected: ISmokeTestOptions = {
            url: "https://google.com",
            headers: undefined,
            method: "GET",
            resolveWithFullResponse: true,
            status: 200,
            timeout: undefined,
            strictSSL: true,
            proxy: undefined
        }

        expect(mockSmokeTest.mock.calls[0][0]).toEqual(expected);
        expected.url = "https://github.com";
        expect(mockSmokeTest.mock.calls[1][0]).toEqual(expected);
    });

    it("should call smokeTest with the expected parameters for multiple urls and the header option", async () =>
    {
        const res = await cli(getCliArgs("https://google.com", "https://github.com", "--headers.TestHeader", "test value"));
        expect(res).toBe(0);

        expect(mockSmokeTest).toHaveBeenCalledTimes(2);

        let expected: ISmokeTestOptions = {
            url: "https://google.com",
            headers: { TestHeader: "test value" },
            method: "GET",
            resolveWithFullResponse: true,
            status: 200,
            timeout: undefined,
            strictSSL: true,
            proxy: undefined
        }

        expect(mockSmokeTest.mock.calls[0][0]).toEqual(expected);
        expected.url = "https://github.com";
        expect(mockSmokeTest.mock.calls[1][0]).toEqual(expected);
    });

    it("should call smokeTest with the expected parameters for multiple urls and the status option", async () =>
    {
        const res = await cli(getCliArgs("https://google.com", "https://github.com", "--status", "400"));
        expect(res).toBe(0);

        expect(mockSmokeTest).toHaveBeenCalledTimes(2);

        let expected: ISmokeTestOptions = {
            url: "https://google.com",
            headers: undefined,
            method: "GET",
            resolveWithFullResponse: true,
            status: 400,
            timeout: undefined,
            strictSSL: true,
            proxy: undefined
        }

        expect(mockSmokeTest.mock.calls[0][0]).toEqual(expected);
        expected.url = "https://github.com";
        expect(mockSmokeTest.mock.calls[1][0]).toEqual(expected);
    });

    it("should call smokeTest with the expected parameters for multiple urls and the method option", async () =>
    {
        const res = await cli(getCliArgs("https://google.com", "https://github.com", "--method", "POST"));
        expect(res).toBe(0);

        expect(mockSmokeTest).toHaveBeenCalledTimes(2);

        let expected: ISmokeTestOptions = {
            url: "https://google.com",
            headers: undefined,
            method: "POST",
            resolveWithFullResponse: true,
            status: 200,
            timeout: undefined,
            strictSSL: true,
            proxy: undefined
        }

        expect(mockSmokeTest.mock.calls[0][0]).toEqual(expected);
        expected.url = "https://github.com";
        expect(mockSmokeTest.mock.calls[1][0]).toEqual(expected);
    });

    it("should call smokeTest with the expected parameters for multiple urls and the timeout option", async () =>
    {
        const res = await cli(getCliArgs("https://google.com", "https://github.com", "--timeout", "500"));
        expect(res).toBe(0);

        expect(mockSmokeTest).toHaveBeenCalledTimes(2);

        let expected: ISmokeTestOptions = {
            url: "https://google.com",
            headers: undefined,
            method: "GET",
            resolveWithFullResponse: true,
            status: 200,
            timeout: 500,
            strictSSL: true,
            proxy: undefined
        }

        expect(mockSmokeTest.mock.calls[0][0]).toEqual(expected);
        expected.url = "https://github.com";
        expect(mockSmokeTest.mock.calls[1][0]).toEqual(expected);
    });

    it("should call smokeTest with the expected parameters for multiple urls and the resolveWithFullResponse option", async () =>
    {
        const res = await cli(getCliArgs("https://google.com", "https://github.com", "--resolveWithFullResponse", "false"));
        expect(res).toBe(0);

        expect(mockSmokeTest).toHaveBeenCalledTimes(2);

        let expected: ISmokeTestOptions = {
            url: "https://google.com",
            headers: undefined,
            method: "GET",
            resolveWithFullResponse: false,
            status: 200,
            timeout: undefined,
            strictSSL: true,
            proxy: undefined
        }

        expect(mockSmokeTest.mock.calls[0][0]).toEqual(expected);
        expected.url = "https://github.com";
        expect(mockSmokeTest.mock.calls[1][0]).toEqual(expected);
    });

    it("should call smokeTest with the expected parameters for multiple urls and the strictSSL option", async () =>
    {
        const res = await cli(getCliArgs("https://google.com", "https://github.com", "--strictSSL", "false"));
        expect(res).toBe(0);

        expect(mockSmokeTest).toHaveBeenCalledTimes(2);

        let expected: ISmokeTestOptions = {
            url: "https://google.com",
            headers: undefined,
            method: "GET",
            resolveWithFullResponse: true,
            status: 200,
            timeout: undefined,
            strictSSL: false,
            proxy: undefined
        }

        expect(mockSmokeTest.mock.calls[0][0]).toEqual(expected);
        expected.url = "https://github.com";
        expect(mockSmokeTest.mock.calls[1][0]).toEqual(expected);
    });

    it("should call smokeTest with the expected parameters for multiple urls and the proxy option", async () =>
    {
        const res = await cli(getCliArgs("https://google.com", "https://github.com", "--proxy", "http://127.0.0.1:8888"));
        expect(res).toBe(0);

        expect(mockSmokeTest).toHaveBeenCalledTimes(2);

        let expected: ISmokeTestOptions = {
            url: "https://google.com",
            headers: undefined,
            method: "GET",
            resolveWithFullResponse: true,
            status: 200,
            timeout: undefined,
            strictSSL: true,
            proxy: "http://127.0.0.1:8888"
        }

        expect(mockSmokeTest.mock.calls[0][0]).toEqual(expected);
        expected.url = "https://github.com";
        expect(mockSmokeTest.mock.calls[1][0]).toEqual(expected);
    });

    it("should call smokeTest with the expected parameters for multiple urls and all options", async () =>
    {
        const res = await cli(getCliArgs(
            "https://google.com",
            "https://github.com",
            "--headers.TestHeader", "test value",
            "--status", "400",
            "--method", "POST",
            "--timeout", "500",
            "--resolveWithFullResponse", "false",
            "--strictSSL", "false",
            "--proxy", "http://127.0.0.1:8888"));
        expect(res).toBe(0);

        expect(mockSmokeTest).toHaveBeenCalledTimes(2);

        let expected: ISmokeTestOptions = {
            url: "https://google.com",
            headers: { TestHeader: "test value" },
            method: "POST",
            resolveWithFullResponse: false,
            status: 400,
            timeout: 500,
            strictSSL: false,
            proxy: "http://127.0.0.1:8888"
        }

        expect(mockSmokeTest.mock.calls[0][0]).toEqual(expected);
        expected.url = "https://github.com";
        expect(mockSmokeTest.mock.calls[1][0]).toEqual(expected);
    });

    it("should handle errors", async () =>
    {
        mockSmokeTest.mockImplementationOnce(() =>
        {
            throw new Error("mocked exception");
        })
        const res = await cli(getCliArgs("https://google.com"));
        expect(res).toBe(1);
    });
});
