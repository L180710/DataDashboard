/**
 * 获取格式化后的当前时间
 */
export const getCurrentTime = () => {
  const now = new Date()

  return {
    time: now.toLocaleTimeString('zh-CN', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }),
    date: [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, '0'),
      String(now.getDate()).padStart(2, '0'),
    ].join('-'),
    week: new Intl.DateTimeFormat('zh-CN', {
      weekday: 'long',
    }).format(now),
  }
}

/**
 * 启动实时更新时间定时器，返回清理函数，供组件卸载时调用
 */
export const startClock = (
  callback: (value: ReturnType<typeof getCurrentTime>) => void,
  interval?: 1000,
) => {
  callback(getCurrentTime())

  const timer = setInterval(() => {
    callback(getCurrentTime())
  }, interval)

  return () => clearInterval(timer)
}
