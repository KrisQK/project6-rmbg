import { processImage } from "@/app/actions";

describe("图片处理功能测试", () => {
    beforeEach(() => {
        // 设置测试环境变量
        process.env.BLOB_READ_WRITE_TOKEN = "test-token";
        process.env.FAL_KEY = "test-key";
    });

    test("应该处理空的FormData", async () => {
        const formData = new FormData();
        const result = await processImage(formData);

        expect(result).toEqual({
            success: false,
            error: "No image provided",
        });
    });

    test("应该检测缺失的环境变量", async () => {
        process.env.BLOB_READ_WRITE_TOKEN = undefined;

        const formData = new FormData();
        formData.append(
            "image",
            new File([""], "test.png", { type: "image/png" })
        );

        const result = await processImage(formData);

        expect(result).toEqual({
            success: false,
            error: "Storage configuration error",
        });
    });
});
