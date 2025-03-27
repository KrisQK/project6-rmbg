"use server";

import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { fal } from "@fal-ai/client";

// 配置 fal client
fal.config({
    credentials: process.env.FAL_KEY,
});

// 图片处理函数
export async function processImage(formData: FormData) {
    try {
        // 获取 token
        const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
        console.log(
            "🧪 FAL_KEY (prefix):",
            process.env.FAL_KEY?.slice(0, 6) || "undefined"
        );
        // 检查是否有 token
        if (!blobToken) {
            console.error("Missing BLOB_READ_WRITE_TOKEN");
            return { success: false, error: "Storage configuration error" };
        }

        // 从FormData中获取图片文件
        const imageFile = formData.get("image") as File;

        if (!imageFile) {
            return { success: false, error: "No image provided" };
        }

        // 上传图片到 Vercel Blob 存储，显式传递 token
        const originalBlob = await put(
            `original-${Date.now()}-${imageFile.name}`,
            imageFile,
            {
                access: "public",
                token: blobToken, // 显式添加 token
            }
        );

        // 使用 fal.ai 的 API 去除背景
        console.log("开始调用FAL API，图片URL:", originalBlob.url);
        try {
            const result = await fal.subscribe("fal-ai/birefnet/v2", {
                input: {
                    image_url: originalBlob.url,
                    model: "General Use (Light)",
                    output_format: "png",
                    refine_foreground: true,
                },
            });
            console.log(
                "FAL API返回详情:",
                JSON.stringify(result).substring(0, 200)
            );

            // 检查处理结果
            if (!result.data?.image?.url) {
                console.error("FAL API返回数据缺少图片URL:", result);
                throw new Error("API response missing image URL");
            }

            revalidatePath("/");

            return {
                success: true,
                url: result.data.image.url,
            };
        } catch (apiError: Error | unknown) {
            console.error("FAL API调用失败:", apiError);
            const errorMessage =
                apiError instanceof Error ? apiError.message : "Unknown error";
            throw new Error(`API call failed: ${errorMessage}`);
        }
    } catch (error: Error | unknown) {
        console.error("Error processing image:", error);
        return { success: false, error: "Failed to process image" };
    }
}
