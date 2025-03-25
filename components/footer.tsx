import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} 图片处理应用. 保留所有权利.</p>
          </div>
          <nav className="flex gap-4">
            <Link href="#" className="text-sm text-gray-500 hover:underline">
              关于我们
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:underline">
              隐私政策
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:underline">
              使用条款
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:underline">
              联系我们
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}

