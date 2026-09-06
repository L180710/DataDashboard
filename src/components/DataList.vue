<!-- 单项数据模型 -->
<template>
  <div class="data-list" :style="{ 'grid-template-columns': `repeat(${columns}, 1fr)` }">
    <div class="data-item" v-for="item in list" :key="item.id" :style="{ '--color': item.color }">
      <div class="data-icon flex">
        <Icon :name="`${item.icon}`" size=".2rem" :color="`${item.color}`" />
      </div>
      <div class="data-title">{{ item.title }}</div>
      <div class="data-account">{{ item.account }}</div>
      <div class="data-diff-status">
        较上个月
        <span class="data-status"> {{ item.status ? '↑' : '↓' }} {{ item.diff }}%</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from './Icon.vue'
import type { KeyDataList } from '@/types/dashboard.ts'

defineProps<{
  columns: number
  list: KeyDataList
}>()
</script>

<style lang="less" scoped>
.data-list {
  display: grid;
  gap: 0.12rem;
  flex-grow: 0;
}

.data-item {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  flex: 1;
  gap: 0.1rem 0.15rem;
  padding: 0.1rem;
  color: #edebeb;
  border-radius: 0.1rem;
  background: rgb(7 7 122 / 12%);
  border: 1px solid rgb(63 81 122);

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
    font-size: 0.14rem;
  }

  .data-diff-status {
    font-size: 0.14rem;
  }

  .data-account {
    font-size: 0.2rem;
    line-height: 1;
    font-weight: 500;
    letter-spacing: 1px;
  }

  .data-status {
    color: var(--color);
  }
}
</style>
