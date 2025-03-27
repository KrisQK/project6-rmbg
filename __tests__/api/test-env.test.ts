import { describe, test, expect, beforeEach } from "@jest/globals";
import { GET } from "@/app/api/test-env/route";

/**
 * 环境变量测试套件
 *
 * 这些测试确保应用能够正确检测必要的环境变量
 */
describe("环境变量测试", () => {
    beforeEach(() => {
        // 在每个测试前重置环境变量
        process.env.BLOB_READ_WRITE_TOKEN = undefined;
        process.env.FAL_KEY = undefined;
    });

    test("应该检测到缺失的环境变量", async () => {
        const response = await GET();
        const data = await response.json();

        expect(data).toEqual({
            blobTokenExists: false,
            falKeyExists: false,
        });
    });

    test("应该检测到存在的环境变量", async () => {
        // 设置测试环境变量
        process.env.BLOB_READ_WRITE_TOKEN = "test-token";
        process.env.FAL_KEY = "test-key";

        const response = await GET();
        const data = await response.json();

        expect(data).toEqual({
            blobTokenExists: true,
            falKeyExists: true,
        });
    });
});
