import * as request from "request-promise";
import { smokeTest } from "../src/smoke-test";
import { ISmokeTestOptions } from "../src/interfaces";

describe("the smoke test", () =>
{
    it("should make the expected request (default opts)", async () =>
    {
        const opts: ISmokeTestOptions = {
            url: "https://google.com",
            headers: undefined,
            method: "GET",
            resolveWithFullResponse: true,
            status: 200,
            timeout: undefined
        };

        const res = await smokeTest(opts);

        expect(res).toBeTruthy();
    });

    it("should make the expected request (full opts)", async () =>
    {
        const opts: ISmokeTestOptions = {
            url: "http://httpbin.org/post",
            headers: { TestHeader: "test value" },
            method: "POST",
            status: 200,
            timeout: 500,
            resolveWithFullResponse: true
        };

        const res = await smokeTest(opts);

        expect(res).toBeTruthy();
    });

    it("should return false if status code validation fails", async () =>
    {
        const opts: ISmokeTestOptions = {
            url: "https://google.com",
            headers: { TestHeader: "test value" },
            method: "POST",
            resolveWithFullResponse: false,
            status: 400,
            timeout: 500
        };

        const res = await smokeTest(opts);

        expect(res).toBeFalsy();
    });

    it("should return true if error status but status code validation succeeds", async () =>
    {
        const opts: ISmokeTestOptions = {
            url: "https://google.com",
            headers: { TestHeader: "test value" },
            method: "POST",
            resolveWithFullResponse: false,
            status: 405,
            timeout: 500
        };

        const res = await smokeTest(opts);

        expect(res).toBeTruthy();
    });

    it("should throw if an unkown domain is used", async () =>
    {
        const opts: ISmokeTestOptions = {
            url: `https://this-should-never-exist-${Math.random() * 1000}.com`,
            headers: { TestHeader: "test value" },
            method: "POST",
            resolveWithFullResponse: false,
            status: 405,
            timeout: 500
        };

        return expect(smokeTest(opts)).rejects.toBeTruthy();
    });

});