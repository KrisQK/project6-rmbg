import { fal } from "@fal-ai/client";

export async function GET() {
    try {
        // 使用公开可访问的图片URL测试
        const testUrl =
            "https://images.unsplash.com/photo-1595752024492-eca13a757da8?q=80";

        const result = await fal.subscribe("fal-ai/birefnet/v2", {
            input: {
                image_url: testUrl,
                model: "General Use (Light)",
                output_format: "png",
            },
        });

        return Response.json({
            success: true,
            hasResult: !!result.data?.image?.url,
            resultUrl: result.data?.image?.url?.substring(0, 30) + "...",
        });
    } catch (error) {
        return Response.json(
            {
                success: false,
                error: (error as Error).message,
            },
            { status: 500 }
        );
    }
}
