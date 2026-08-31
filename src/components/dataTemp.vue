<!-- 单项数据模型 -->
<template>
  <div class="data-container" :style="{ '--color': data.color }">
    <div class="data-icon flex">
      <AppIcon :name="`${data.icon}`" size=".2rem" :color="`${data.color}`" />
    </div>
    <div class="data-title">{{ data.title }}</div>
    <div class="data-account">{{ data.account }}</div>
    <div class="data-diff-status">
      较上个月
      <span class="data-status"> {{ data.status ? '↑' : '↓' }} {{ data.diff }}%</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppIcon from './appIcon.vue'
import type { KeyDataItem } from '@/types/dashboard.ts'

const props = defineProps<{
  data: KeyDataItem
}>()
</script>

<style lang="less" scoped>
.data-container {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  flex: 1;
  gap: 0.1rem 0.15rem;
  padding: 0.1rem;
  color: #edebeb;
  border-radius: 0.1rem;
  background: linear-gradient(135deg, #5355c7, #2424d2, #07077a);

  .data-icon {
    grid-row: 1/ 4;
    margin-top: 0.05rem;
    padding: 0.1rem;
    height: max-content;
    border-radius: 6px;
    border: 1px solid color-mix(in srgb, var(--color) 40%, transparent);
    background-color: color-mix(in srgb, var(--color) 30%, transparent);
  }

  .data-title,
  .data-diff-status {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .data-title {
    font-size: 0.18rem;
  }

  .data-diff-status {
    font-size: 0.16rem;
  }

  .data-account {
    font-size: 0.26rem;
    line-height: 1.1;
    font-weight: 500;
    letter-spacing: 1px;
  }

  .data-status {
    color: var(--color);
  }
}
</style>
