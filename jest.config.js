// 导入 Next.js 的 Jest 配置工具
import nextJest from "next/jest";

// 创建 Next.js 的 Jest 配置生成器
const createJestConfig = nextJest({
    dir: "./", // 指定项目根目录
});

// 自定义 Jest 配置
const customJestConfig = {
    // 指定测试启动前需要运行的脚本文件
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    // 设置测试环境为 jsdom,用于模拟浏览器环境
    testEnvironment: "jest-environment-jsdom",
};

// 导出最终的 Jest 配置
module.exports = createJestConfig(customJestConfig);
