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

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedImage(file);

            // Create a preview URL for the selected image
            const fileUrl = URL.createObjectURL(file);
            setPreviewUrl(fileUrl);

            // Reset processed image when a new image is selected
            setProcessedImageUrl(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedImage) return;

        try {
            setIsProcessing(true);

            // Create a FormData object to send the image
            const formData = new FormData();
            formData.append("image", selectedImage);

            // Process the image using the server action
            const result = await processImage(formData);

            if (result.success) {
                setProcessedImageUrl(result.url || null);
            }
        } catch (error) {
            console.error("Error processing image:", error);
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
                                            ? "处理中..."
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
