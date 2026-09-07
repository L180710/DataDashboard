<template>
  <ul class="order-list">
    <li class="list-item list-header">
      <div class="data">订单号</div>
      <div class="data">用户</div>
      <div class="data">商品</div>
      <div class="data">金额（元）</div>
      <div class="data">时间</div>
      <div class="data">状态</div>
    </li>
    <li class="list-item" v-for="item in dataList" :key="item.id">
      <div class="data">{{ item.orderNum }}</div>
      <div class="data">{{ item.userName }}</div>
      <div class="data">{{ item.productName }}</div>
      <div class="data">{{ item.price.toFixed(2) }}</div>
      <div class="data">{{ item.time }}</div>
      <div class="data">
        <span class="state0" v-if="item.state === 0">待发货</span>
        <span class="state1" v-else-if="item.state === 1">已发货</span>
        <span class="state2" v-else-if="item.state === 2">已完成</span>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { OrderLatestList } from '@/types/dashboard.ts'
const dataList: OrderLatestList = [
  {
    id: '1',
    orderNum: 'ORD20260901',
    userName: '张三',
    productName: '高性能机械键盘',
    price: 399.0,
    time: '2026-09-01',
    state: 0, // 待发货
  },
  {
    id: '2',
    orderNum: 'ORD20260902',
    userName: '李四',
    productName: '无线降噪耳机',
    price: 899.0,
    time: '2026-09-02',
    state: 1, // 已发货
  },
  {
    id: '3',
    orderNum: 'ORD20260903',
    userName: '王五',
    productName: '27英寸4K显示器',
    price: 2199.0,
    time: '2026-09-03',
    state: 2, // 已完成
  },
  {
    id: '4',
    orderNum: 'ORD20260904',
    userName: '赵六',
    productName: '人体工学办公椅',
    price: 1580.0,
    time: '2026-09-04',
    state: 1, // 已发货
  },
  {
    id: '5',
    orderNum: 'ORD20260905',
    userName: '孙七',
    productName: '智能手表Pro Max',
    price: 2599.0,
    time: '2026-09-05',
    state: 0, // 待发货
  },
]
</script>

<style lang="less" scoped>
.order-list {
  width: 100%;
  height: max-content;

  .list-item {
    display: grid;
    align-items: center;
    grid-template-columns: 1.5fr 1fr 1.5fr 1.5fr 1.5fr 1fr;
    font-size: 0.18rem;
    color: #dce8ff;

    &:nth-child(odd) {
      background-color: rgba(16, 67, 160, 0.2);
    }

    &.list-header {
      font-weight: bold;
      background-color: #0b3c8c;
    }

    .data {
      overflow: hidden;
      padding: 0.1rem 0.2rem;
      font-size: 0.14rem;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .state0 {
      color: rgb(234, 42, 8);
    }

    .state1 {
      color: rgb(245, 200, 36);
    }

    .state2 {
      color: rgb(34 197 94);
    }
  }
}
</style>
