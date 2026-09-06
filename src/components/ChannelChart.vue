<template>
  <div ref="chartRef" class="chart"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { useECharts } from '@/composables/useECharts'
import { remToPx } from '@/utils/responsive'

const getOption = (): echarts.EChartsOption => {
  return {
    color: ['#3b82f6', '#38bdf8', '#b37feb', '#fbbf24', '#a1a1aa'],

    legend: {
      orient: 'vertical',
      left: '64%',
      top: 'middle',
      icon: 'circle',
      itemWidth: 8,
      itemHeight: 8,
      itemGap: remToPx(0.14),
      textStyle: {
        color: '#dce8ff',
        fontSize: remToPx(0.14),
      },
      formatter: (name: string) => {
        const percentageMap: Record<string, string> = {
          直接访问: '35%',
          搜索引擎: '30%',
          社交媒体: '20%',
          广告投放: '10%',
          其他: '5%',
        }
        return `${name}  ${percentageMap[name] || ''}`
      },
    },

    tooltip: {
      show: false,
    },

    series: [
      {
        name: '渠道来源',
        type: 'pie',
        center: ['30%', '50%'],
        radius: ['34%', '78%'],
        padAngle: 1,
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            color: '#f1f1f1',
            fontSize: remToPx(0.16),
          },
        },
        itemStyle: {
          borderColor: '#040c28',
          borderRadius: 2,
        },
        data: [
          { value: 45038, name: '直接访问' },
          { value: 38604, name: '搜索引擎' },
          { value: 25736, name: '社交媒体' },
          { value: 12868, name: '广告投放' },
          { value: 6434, name: '其他' },
        ],
      },
    ],
  }
}

const { chartRef } = useECharts(getOption)
</script>

<style lang="less" scoped></style>
