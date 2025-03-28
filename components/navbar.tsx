"use client";

import Link from "next/link";
import { Home, Image, Settings, Info } from "lucide-react";

export default function Navbar() {
    return (
        <header className="border-b">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-6">
                    <Link
                        href="/"
                        className="text-xl font-bold"
                    >
                        图片处理
                    </Link>
                    <nav className="hidden md:flex gap-6">
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-sm font-medium"
                        >
                            <Home className="h-4 w-4" />
                            首页
                        </Link>
                        <Link
                            href="#"
                            className="flex items-center gap-2 text-sm font-medium"
                        >
                            <Image className="h-4 w-4" />
                            图库
                        </Link>
                        <Link
                            href="#"
                            className="flex items-center gap-2 text-sm font-medium"
                        >
                            <Settings className="h-4 w-4" />
                            设置
                        </Link>
                        <Link
                            href="/about"
                            className="flex items-center gap-2 text-sm font-medium"
                        >
                            <Info className="h-4 w-4" />
                            关于
                        </Link>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <Link
                        href="#"
                        className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
                        onClick={e => {
                            e.preventDefault();
                            alert("登录功能已简化为本地提示，无需谷歌登录");
                        }}
                    >
                        登录
                    </Link>
                </div>
            </div>
        </header>
    );
}
