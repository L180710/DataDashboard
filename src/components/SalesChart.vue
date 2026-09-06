<template>
  <div ref="chartRef" class="chart"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { useECharts } from '@/composables/useECharts'
import { remToPx } from '@/utils/responsive'

const getOption = (): echarts.EChartsOption => {
  return {
    color: ['#4da3ff'],

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

      data: ['销售额（元）'],
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
            ￥${Number(data.data).toLocaleString()}
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
      data: ['08-16', '08-17', '08-18', '08-19', '08-20', '08-21', '08-22'],

      // x 轴 0 水平线
      axisLine: {
        lineStyle: {
          color: '#0a2368',
        },
      },

      // x 轴名称
      axisLabel: {
        color: '#a9b8d0',
        fontSize: remToPx(0.16),
        margin: 10,
      },
    },

    yAxis: {
      type: 'value',
      min: 0,
      max: 100000,
      interval: 20000,
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
          color: 'rgba(16, 67, 160, 0)',
        },
      },
    },

    series: [
      {
        name: '销售额（元）',
        type: 'line',
        smooth: true,
        // 折现点大小
        symbolSize: 3,

        // 折现
        lineStyle: {
          color: '#4da3ff',
          width: 1,
        },

        // 折线图的点
        itemStyle: {
          color: '#63b7ff',
          borderColor: '#3f95e8',
          borderWidth: 1,
        },

        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(44, 142, 255, 0.45)',
            },
            {
              offset: 1,
              color: 'rgba(4, 12, 50, 0)',
            },
          ]),
        },

        data: [26000, 40000, 59000, 50000, 72000, 65000, 82000],
      },
    ],
  }
}

const { chartRef } = useECharts(getOption)
</script>

<style lang="less" scoped></style>
