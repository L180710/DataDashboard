<template>
  <div ref="chartRef" class="chart"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { useECharts } from '@/composables/useECharts'
import { remToPx } from '@/utils/responsive'

const getOption = (): echarts.EChartsOption => {
  return {
    color: ['#4da3ff', '#b37feb'], // 男蓝 女紫

    legend: {
      top: '0',
      left: '2%',
      icon: 'circle',
      itemWidth: 8,
      itemHeight: 8,
      itemGap: remToPx(0.2),
      textStyle: {
        color: '#dce8ff',
        fontSize: remToPx(0.16),
      },
      formatter: (name: string) => {
        const dataMap: Record<string, string> = { 男: '60%', 女: '40%' }
        return `${name} ${dataMap[name] || ''}`
      },
      data: ['男', '女'],
    },

    graphic: [
      {
        type: 'text',
        top: '18%',
        left: '55%',
        style: {
          text: '年龄分布',
          fill: '#dce8ff',
          fontSize: remToPx(0.16),
        },
      },
    ],

    // 年龄分布位置
    grid: [
      {},
      {
        left: '55.5%',
        right: '12%',
        top: '30%',
        bottom: '0',
        containLabel: true,
      },
    ],

    // 年龄分布水平轴线
    xAxis: [
      { type: 'value', show: false },
      { type: 'value', show: false, max: 30, gridIndex: 1 },
    ],

    yAxis: [
      { type: 'category', show: false },
      {
        type: 'category',
        gridIndex: 1,
        data: ['18-24岁', '25-34岁', '35-44岁', '45-54岁', '55岁以上'],
        position: 'left',
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          color: '#dce8ff',
          fontSize: remToPx(0.16),
          margin: remToPx(0.1),
        },
      },
    ],

    series: [
      {
        type: 'pie',
        center: ['26%', '56%'],
        radius: ['30%', '60%'],
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
          { value: 60, name: '男' },
          { value: 40, name: '女' },
        ],
      },
      {
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        barWidth: remToPx(0.08),
        itemStyle: {
          borderRadius: [3, 3, 3, 3],
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#4da3ff' },
            { offset: 1, color: 'rgba(77, 163, 255, 0.6)' },
          ]),
        },
        label: {
          show: true,
          position: 'right',
          color: '#ffffff',
          fontSize: remToPx(0.14),
          formatter: '{c}%',
        },
        data: [24, 38, 22, 10, 6],
      },
    ],
  }
}

const { chartRef } = useECharts(getOption)
</script>

<style lang="less" scoped></style>
