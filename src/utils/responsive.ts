// 将 rem 转换成当前屏幕实际 px

export const remToPx = (rem: number) => {
  const rootFontSize = Number.parseFloat(window.getComputedStyle(document.documentElement).fontSize)
  return rem * rootFontSize
}
