<template>
  <div ref="chartRef" class="chart"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import * as echarts from 'echarts'
import { useECharts } from '@/composables/useECharts'
import { remToPx } from '@/utils/responsive'
import type { OrderTrendList } from '../../shared/types/dashboard'

const props = defineProps<{
  orderTrendList: OrderTrendList
}>()

// 日期
const dateArr = computed(() => {
  return (props.orderTrendList ?? []).map((item) => item.name)
})

// 数值
const valueArr = computed(() => {
  return (props.orderTrendList ?? []).map((item) => item.value)
})

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
        fontSize: remToPx(0.18),
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
        <div style="font-size:${remToPx(0.16)};margin-bottom:6px;">
          ${data.axisValue}
        </div>

        <div style="font-size:${remToPx(0.16)};font-weight:bold;">
          ${Number(data.data).toLocaleString()} 单
        </div>
      `
      },
    },

    grid: {
      top: remToPx(0.7),
      left: 0,
      right: 0,
      bottom: 0,
    },

    xAxis: {
      type: 'category',
      data: dateArr.value,
      axisLabel: {
        color: '#a9b8d0',
        fontSize: remToPx(0.16),
        margin: 10,
      },
    },

    yAxis: {
      type: 'value',
      min: 0,
      max: 1500,
      interval: 300,
      axisLabel: {
        color: '#a9b8d0',
        fontSize: remToPx(0.16),
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
            color: 'rgba(77, 163, 255, 0.3)',
          },
          {
            offset: 1,
            color: '#4da3ff',
          },
        ]),
        // 数据
        data: valueArr.value,
      },
    ],
  }
}

const { chartRef } = useECharts(getOption)
</script>

<style lang="less" scoped></style>
