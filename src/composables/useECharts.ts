import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'

export function useECharts(getOption?: () => echarts.EChartsOption) {
  const chartRef = ref<HTMLDivElement | null>(null)
  let chartInstance: echarts.ECharts | null = null
  let resizeObserver: ResizeObserver | null = null

  /**
   * 设置图表配置
   */
  const setOption = (option: echarts.EChartsOption) => {
    chartInstance?.setOption(option)
  }

  /**
   * 更新图表
   */
  const updateChart = () => {
    if (!chartInstance || !getOption) return

    chartInstance.setOption(getOption())
  }

  /**
   * 调整图表尺寸
   */
  const resize = () => {
    // todo，为了优化而作的，但不确定是否有效
    // chartInstance?.resize()
  }

  onMounted(() => {
    if (!chartRef.value) return

    // 初始化
    chartInstance = echarts.init(chartRef.value)

    // 初始配置
    updateChart()

    // 监听容器大小
    resizeObserver = new ResizeObserver(() => {
      // todo，为了优化而作的，但不确定是否有效
      // resize()

      // 重新计算 option
      updateChart()
    })

    resizeObserver.observe(chartRef.value)
  })

  onBeforeUnmount(() => {
    resizeObserver?.disconnect()
    resizeObserver = null

    chartInstance?.dispose()
    chartInstance = null
  })

  return {
    chartRef,
  }
}
