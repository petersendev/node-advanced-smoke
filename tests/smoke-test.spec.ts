import * as request from "request-promise";
import { smokeTest } from "../src/smoke-test";
import { ISmokeTestOptions } from "../src/interfaces";

jest.mock("request-promise", () =>
{
    return jest.fn(() =>
    {
        return Promise.resolve({
            statusCode: 200
        });
    });
});

const mockRequest = <jest.Mock><any>request;

describe("the smoke test", () =>
{
    beforeEach(() =>
    {
        mockRequest.mockClear();
    });

    it("should make the expected request (default opts)", async () =>
    {
        const opts: ISmokeTestOptions = {
            url: "https://google.com",
            headers: undefined,
            method: "GET",
            resolveWithFullResponse: true,
            status: 200,
            timeout: undefined,
            strictSSL: true,
            proxy: undefined
        };

        const res = await smokeTest(opts);

        expect(res).toBeTruthy();

        expect(mockRequest).toHaveBeenCalled();
        expect(mockRequest).toHaveBeenCalledWith(opts.url, {
            headers: opts.headers,
            method: opts.method,
            resolveWithFullResponse: opts.resolveWithFullResponse,
            timeout: opts.timeout,
            strictSSL: opts.strictSSL,
            proxy: undefined
        });
    });

    it("should make the expected request (full opts)", async () =>
    {
        const opts: ISmokeTestOptions = {
            url: "https://google.com",
            headers: { TestHeader: "test value" },
            method: "POST",
            resolveWithFullResponse: false,
            status: 200,
            timeout: 500,
            strictSSL: false,
            proxy: "http://127.0.0.1:8888"
        };

        const res = await smokeTest(opts);

        expect(res).toBeTruthy();

        expect(mockRequest).toHaveBeenCalled();
        expect(mockRequest).toHaveBeenCalledWith(opts.url, {
            headers: opts.headers,
            method: opts.method,
            resolveWithFullResponse: opts.resolveWithFullResponse,
            timeout: opts.timeout,
            strictSSL: opts.strictSSL,
            proxy: opts.proxy
        });
    });

    it("should return false if status code validation fails", async () =>
    {
        const opts: ISmokeTestOptions = {
            url: "https://google.com",
            headers: { TestHeader: "test value" },
            method: "POST",
            resolveWithFullResponse: false,
            status: 400,
            timeout: 500,
            strictSSL: true,
            proxy: undefined
        };

        const res = await smokeTest(opts);

        expect(res).toBeFalsy();
    });

    it("should use ADVANCED_SMOKE_PROXY environment variable", async () =>
    {
        const opts: ISmokeTestOptions = {
            url: "https://google.com",
            headers: undefined,
            method: "GET",
            resolveWithFullResponse: true,
            status: 200,
            strictSSL: true,
            timeout: undefined
        };

        process.env.ADVANCED_SMOKE_PROXY = "http://127.0.0.1:8888";

        const res = await smokeTest(opts);

        expect(res).toBeTruthy();

        expect(mockRequest).toHaveBeenCalled();
        expect(mockRequest).toHaveBeenCalledWith(opts.url, {
            headers: opts.headers,
            method: opts.method,
            resolveWithFullResponse: opts.resolveWithFullResponse,
            timeout: opts.timeout,
            strictSSL: opts.strictSSL,
            proxy: "http://127.0.0.1:8888"
        });
    });
});