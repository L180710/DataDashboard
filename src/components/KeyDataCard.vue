<!-- 单项数据模型 -->
<template>
  <div
    class="data-container"
    v-for="item in list"
    :key="item.id"
    :style="{ '--color': item.color }"
  >
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
</template>

<script setup lang="ts">
import Icon from './Icon.vue'
import type { KeyDataList } from '@/types/dashboard.ts'

const list: KeyDataList = [
  {
    id: '1',
    icon: 'zongyonghushu',
    title: '用户总数',
    account: 128681,
    diff: 3,
    status: 1,
    color: '#6fadea',
  },
  {
    id: '2',
    icon: 'dingdanshu',
    title: '总订单数',
    account: 128999,
    diff: 2.3,
    status: 1,
    color: '#725bce',
  },
  {
    id: '3',
    icon: 'xiaoshouguanli',
    title: '总销售额',
    account: 8999,
    diff: 1,
    status: 0,
    color: '#d6aa59',
  },
  {
    id: '4',
    icon: 'zhuanhuashuai',
    title: '转化率',
    account: 35.6,
    diff: 3.2,
    status: 1,
    color: '#89d1b5',
  },
]
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
