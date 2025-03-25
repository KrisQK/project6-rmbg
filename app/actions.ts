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
        // 从FormData中获取图片文件
        const imageFile = formData.get("image") as File;

        if (!imageFile) {
            return { success: false, error: "No image provided" };
        }

        // 上传图片到 Vercel Blob 存储
        const originalBlob = await put(
            `original-${Date.now()}-${imageFile.name}`,
            imageFile,
            {
                access: "public",
            }
        );

        // 使用 fal.ai 的 API 去除背景
        const result = await fal.subscribe("fal-ai/birefnet/v2", {
            input: {
                image_url: originalBlob.url,
                model: "General Use (Light)",
                output_format: "png",
                refine_foreground: true,
            },
        });

        // 检查处理结果
        if (!result.data?.image?.url) {
            throw new Error("Failed to process image");
        }

        revalidatePath("/");

        return {
            success: true,
            url: result.data.image.url,
        };
    } catch (error) {
        console.error("Error processing image:", error);
        return { success: false, error: "Failed to process image" };
    }
}
