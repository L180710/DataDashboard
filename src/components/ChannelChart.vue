<template>
  <div ref="chartRef" class="chart"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import * as echarts from 'echarts'
import { useECharts } from '@/composables/useECharts'
import { remToPx } from '@/utils/responsive'
import type { ChannelStatistics } from '@/types/dashboard'

const props = defineProps<{
  channelStatistics: ChannelStatistics
}>()

const legendPercentage = computed(() => {
  return
})

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
        const total = props.channelStatistics.reduce((sum, item) => sum + item.value, 0)
        const percentageMap = props.channelStatistics.reduce<Record<string, string>>(
          (map, item) => {
            map[item.name] = `${((item.value / total) * 100).toFixed(0)}%`
            return map
          },
          {},
        )
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
        data: props.channelStatistics,
      },
    ],
  }
}

const { chartRef } = useECharts(getOption)
</script>

<style lang="less" scoped></style>
