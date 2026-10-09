<template>
  <ul class="order-list">
    <li class="list-item list-header">
      <div class="data">订单号</div>
      <div class="data">用户</div>
      <div class="data">商品</div>
      <div class="data">金额(元)</div>
      <div class="data">时间</div>
      <div class="data">状态</div>
    </li>
    <li class="list-item" v-for="item in list" :key="item.id">
      <div class="data">{{ item.orderId }}</div>
      <div class="data">{{ item.userName }}</div>
      <div class="data">{{ item.productName }}</div>
      <div class="data">{{ item.amount.toFixed(2) }}</div>
      <div class="data">{{ item.createdAt.split('T')[0] }}</div>
      <div class="data">
        <span class="state0" v-if="item.status === 0">待发货</span>
        <span class="state1" v-else-if="item.status === 1">已发货</span>
        <span class="state2" v-else-if="item.status === 2">已完成</span>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { OrderLatestList } from '../../shared/types/dashboard'

defineProps<{
  list: OrderLatestList
}>()
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

      &:nth-child(4) {
        text-align: right;
      }

      &:nth-child(5),
      &:nth-child(6) {
        text-align: center;
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
}
</style>
