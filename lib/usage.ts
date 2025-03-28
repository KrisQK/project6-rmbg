/**
 * 用户使用限制相关常量
 * DAILY_LIMIT: 每个用户每天最多可以使用的次数
 * USAGE_KEY: 在 localStorage 中存储使用记录的键名
 */
const DAILY_LIMIT = 5;
const USAGE_KEY = "image_processing_usage";

/**
 * 使用记录的数据结构
 * @property count - 当天已使用的次数
 * @property date - 记录的日期，格式为 YYYY-MM-DD
 */
interface UsageRecord {
    count: number;
    date: string;
}

/**
 * 获取今天的日期字符串
 * @returns 格式为 YYYY-MM-DD 的日期字符串
 */
function getTodayString(): string {
    return new Date().toISOString().split("T")[0];
}

/**
 * 获取当前的使用记录
 * @returns 返回当前的使用记录，如果是新的一天或没有记录，则返回初始状态
 */
export function getCurrentUsage(): UsageRecord {
    if (typeof window === "undefined")
        return { count: 0, date: getTodayString() };

    const savedUsage = localStorage.getItem(USAGE_KEY);
    if (!savedUsage) {
        return { count: 0, date: getTodayString() };
    }

    try {
        const usage: UsageRecord = JSON.parse(savedUsage);
        // 如果是新的一天，重置使用记录
        if (usage.date !== getTodayString()) {
            return { count: 0, date: getTodayString() };
        }
        return usage;
    } catch {
        // 如果解析失败，返回初始状态
        return { count: 0, date: getTodayString() };
    }
}

/**
 * 检查用户是否还可以继续使用服务
 * @returns 如果未超出使用限制返回 true，否则返回 false
 */
export function checkUsageLimit(): boolean {
    const usage = getCurrentUsage();
    return usage.count < DAILY_LIMIT;
}

/**
 * 记录新的使用次数
 * 将当前使用次数加1并更新到 localStorage
 */
export function recordUsage(): void {
    if (typeof window === "undefined") return;

    const usage = getCurrentUsage();
    const newUsage: UsageRecord = {
        count: usage.count + 1,
        date: getTodayString(),
    };

    localStorage.setItem(USAGE_KEY, JSON.stringify(newUsage));
}

/**
 * 获取用户今天剩余的使用次数
 * @returns 剩余可用次数，最小为0
 */
export function getRemainingUsage(): number {
    const usage = getCurrentUsage();
    return Math.max(0, DAILY_LIMIT - usage.count);
}
