"use client";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { useRouter } from "next/navigation";

export default function About() {
    const router = useRouter();
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        router.push("/");
    };
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-8">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl font-bold text-center mb-8">
                        关于 FusionHub
                    </h1>

                    <div className="space-y-6 text-lg">
                        <p className="leading-relaxed">
                            欢迎来到 FusionHub
                            的图像处理平台！我们致力于为用户提供专业、高效的图像处理解决方案。
                        </p>

                        <div
                            className="bg-gray-50 p-6 rounded-lg"
                            onClick={handleClick}
                        >
                            <h2 className="text-2xl font-semibold mb-4">
                                我们的优势
                            </h2>
                            <ul className="space-y-3">
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                                    专业的图像处理技术
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                                    简单直观的用户界面
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                                    快速高效的处理速度
                                </li>
                            </ul>
                        </div>

                        <p className="leading-relaxed">
                            作为 FusionHub
                            的重要产品之一，我们不断创新和优化，为用户提供最佳的图像处理体验。无论是个人用户还是企业客户，都能在这里找到适合的解决方案。
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
