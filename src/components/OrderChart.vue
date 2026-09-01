<template>
  <div ref="chartRef" class="chart"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { useECharts } from '@/composables/useECharts'
import { remToPx } from '@/utils/responsive'

const getOption = (): echarts.EChartsOption => {
  return {
    legend: {
      top: 0,
      left: 'center',
      icon: 'circle',
      itemWidth: 8,
      itemHeight: 8,
      itemStyle: {
        borderWidth: 0,
      },
      textStyle: {
        color: '#dce8ff',
        fontSize: remToPx(0.2),
      },

      data: ['订单数（单）'],
    },

    tooltip: {
      trigger: 'axis',

      axisPointer: {
        type: 'line',
        lineStyle: {
          color: '#4da3ff',
          type: 'dashed',
        },
      },
      backgroundColor: 'rgba(4, 12, 40, 0.95)',
      borderColor: '#0b3c8c',
      borderWidth: 1,
      borderRadius: 4,
      padding: [6, 6],

      formatter: (params: any) => {
        const data = params[0]

        return `
        <div style="font-size:${remToPx(0.2)};margin-bottom:6px;">
          ${data.axisValue}
        </div>

        <div style="font-size:${remToPx(0.2)};font-weight:bold;">
          ${Number(data.data).toLocaleString()} 单
        </div>
      `
      },
    },

    grid: {
      top: remToPx(0.8),
      left: 0,
      right: 0,
      bottom: 0,
    },

    xAxis: {
      type: 'category',
      data: ['08-16', '08-17', '08-18', '08-19', '08-20', '08-21', '08-22'],
      axisLabel: {
        color: '#a9b8d0',
        fontSize: remToPx(0.2),
        margin: 10,
      },
    },

    yAxis: {
      type: 'value',
      min: 0,
      max: 5000, // 按要求设置最大值
      interval: 1000, // 根据 0-5000 调整为 1000 的间隔
      axisLabel: {
        color: '#a9b8d0',
        fontSize: remToPx(0.2),

        formatter: (value: number) => {
          return value.toLocaleString()
        },
      },

      // 水平线
      splitLine: {
        lineStyle: {
          color: 'rgba(16, 67, 160, 0.2)', // 调整了透明度，让网格线稍微可见一点
        },
      },
    },

    series: [
      {
        name: '订单数（单）',
        type: 'bar',

        // 柱子的最大宽度，防止柱子过宽
        barMaxWidth: remToPx(0.2),

        // 柱子圆角
        itemStyle: {
          borderRadius: [2, 2, 0, 0], // 顶部两个角圆角
        },

        // 柱子的渐变背景
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: '#4da3ff',
          },
          {
            offset: 1,
            color: '#4da3ff',
          },
        ]),

        // 数据
        data: [1200, 3200, 2800, 4500, 3800, 4200, 5000],
      },
    ],
  }
}

const { chartRef } = useECharts(getOption)
</script>

<style lang="less" scoped>
.chart {
  width: 100%;
  height: 3rem;
}
</style>
