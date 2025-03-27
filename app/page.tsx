"use client";

import type React from "react";

import { useState } from "react";
import { Upload } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { processImage } from "@/app/actions";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function Home() {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(
        null
    );
    const [isProcessing, setIsProcessing] = useState(false);
    const [processingStage, setProcessingStage] = useState<string | null>(null);
    const [errorDetails, setErrorDetails] = useState<{
        stage: string;
        message: string;
        technical?: string;
    } | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedImage(file);

            // Create a preview URL for the selected image
            const fileUrl = URL.createObjectURL(file);
            setPreviewUrl(fileUrl);

            // Reset all states when a new image is selected
            setProcessedImageUrl(null);
            setErrorDetails(null);
            setProcessingStage(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorDetails(null);
        setProcessingStage(null);

        if (!selectedImage) return;

        try {
            setIsProcessing(true);
            setProcessingStage("准备上传图片");

            const formData = new FormData();
            formData.append("image", selectedImage);

            setProcessingStage("正在上传并处理图片");
            const result = await processImage(formData);

            if (result.success && result.url) {
                setProcessedImageUrl(result.url);
                setProcessingStage("处理完成");
                console.log("处理成功，结果URL:", result.url);
            } else {
                const errorMsg = result.error || "处理失败，但没有错误信息";
                setErrorDetails({
                    stage: "图片处理",
                    message: "服务器处理图片时发生错误",
                    technical: errorMsg,
                });
                console.error("处理失败:", errorMsg);
            }
        } catch (error: unknown) {
            let errorStage = "未知阶段";
            let errorMsg = "未知错误";

            // 根据错误类型设置详细信息
            if (error instanceof Error) {
                if (
                    error.name === "TypeError" &&
                    error.message.includes("fetch")
                ) {
                    errorStage = "网络请求";
                    errorMsg = "网络连接失败，请检查您的网络连接";
                } else if (error.message.includes("timeout")) {
                    errorStage = "请求超时";
                    errorMsg = "服务器响应超时，请稍后重试";
                } else if (error.message.includes("413")) {
                    errorStage = "文件大小";
                    errorMsg = "图片文件过大，请选择小于10MB的图片";
                }
            }

            setErrorDetails({
                stage: errorStage,
                message: errorMsg,
                technical:
                    error instanceof Error ? error.message : String(error),
            });
            console.error("错误详情:", error);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                <div className="container mx-auto py-6">
                    <h1 className="text-3xl font-bold text-center mb-8">
                        图片处理应用
                    </h1>

                    {errorDetails && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                            <h3 className="text-red-700 font-semibold mb-2">
                                处理出错 - {errorDetails.stage}
                            </h3>
                            <p className="text-red-600 mb-2">
                                {errorDetails.message}
                            </p>
                            {errorDetails.technical && (
                                <p className="text-sm text-red-500 font-mono bg-red-50 p-2 rounded">
                                    技术详情: {errorDetails.technical}
                                </p>
                            )}
                        </div>
                    )}

                    {processingStage && !errorDetails && (
                        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
                            <p className="text-blue-700">
                                当前状态: {processingStage}
                            </p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* 左侧上传区域 */}
                        <Card>
                            <CardContent className="p-6">
                                <h2 className="text-xl font-semibold mb-4">
                                    上传图片
                                </h2>
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-4"
                                >
                                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                                        <input
                                            type="file"
                                            id="image-upload"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                        <label
                                            htmlFor="image-upload"
                                            className="cursor-pointer flex flex-col items-center"
                                        >
                                            <Upload className="h-10 w-10 text-gray-400 mb-2" />
                                            <span className="text-sm text-gray-500">
                                                点击或拖拽图片到此处
                                            </span>
                                        </label>
                                    </div>

                                    {previewUrl && (
                                        <div className="mt-4">
                                            <p className="text-sm font-medium mb-2">
                                                预览:
                                            </p>
                                            <div className="relative h-48 w-full">
                                                <Image
                                                    src={
                                                        previewUrl ||
                                                        "/placeholder.svg"
                                                    }
                                                    alt="Preview"
                                                    fill
                                                    className="object-contain rounded-md"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <Button
                                        type="submit"
                                        className="w-full"
                                        disabled={
                                            !selectedImage || isProcessing
                                        }
                                    >
                                        {isProcessing
                                            ? `处理中 - ${
                                                  processingStage || "准备中"
                                              }`
                                            : "处理图片"}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>

                        {/* 右侧结果区域 */}
                        <Card>
                            <CardContent className="p-6">
                                <h2 className="text-xl font-semibold mb-4">
                                    处理结果
                                </h2>
                                <div className="flex items-center justify-center border rounded-lg h-64 bg-gray-50">
                                    {processedImageUrl ? (
                                        <div className="relative h-full w-full">
                                            <Image
                                                src={
                                                    processedImageUrl ||
                                                    "/placeholder.svg"
                                                }
                                                alt="Processed Image"
                                                fill
                                                className="object-contain rounded-md"
                                            />
                                        </div>
                                    ) : (
                                        <p className="text-gray-400">
                                            处理后的图片将显示在这里
                                        </p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
