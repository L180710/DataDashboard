<template>
  <div ref="chartRef" class="chart"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import * as echarts from 'echarts'
import { useECharts } from '@/composables/useECharts'
import { remToPx } from '@/utils/responsive'
import type { UserStatistics } from '../../shared/types/dashboard'

const props = withDefaults(
  defineProps<{
    userStatistics: UserStatistics
  }>(),
  {
    userStatistics: () => ({
      gender: [],
      age: [],
    }),
  },
)

const nameArr = computed(() => {
  return props.userStatistics.age.map((item) => `${item.name} 以上`)
})

const valueArr = computed(() => {
  const ageArr = props.userStatistics.age
  const total = ageArr.reduce((sum, item) => {
    return sum + item.value
  }, 0)

  return ageArr.map((item) => {
    return (item.value / total) * 100
  })
})

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
        const genderArr = props.userStatistics.gender

        // 人数总和
        const total = genderArr.reduce((sum, item) => {
          return sum + item.value
        }, 0)

        const male = ((genderArr[0]!.value / total) * 100).toFixed(0)
        const famale = ((genderArr[1]!.value / total) * 100).toFixed(0)

        const dataMap: Record<string, string> = {
          男: `${male}%`,
          女: `${famale}%`,
        }
        return `${name} ${dataMap[name] || ''}`
      },
      data: ['男', '女'],
    },

    graphic: [
      {
        type: 'text',
        top: '12%',
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
        top: '22%',
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
        data: nameArr.value,
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
        radius: ['26%', '60%'],
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
        data: props.userStatistics.gender,
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
        data: valueArr.value,
      },
    ],
  }
}

const { chartRef } = useECharts(getOption)
</script>

<style lang="less" scoped></style>
