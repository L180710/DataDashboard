<template>
  <ul class="data-list" :style="{ '--ratio': '52' }">
    <li class="list-item list-header">
      <div class="data">排名</div>
      <div class="data">商品名称</div>
      <div class="data">销售额 (元)</div>
    </li>
    <li class="list-item" v-for="item in list" :key="item.id">
      <div class="data item-order">{{ item.id }}</div>
      <div class="data item-name-ratio">
        <div class="item-name">{{ item.productName }}</div>
        <div class="item-ratio" :style="{ width: `${item.ratio}%` }"></div>
      </div>
      <div class="data item-price">{{ item.price }}</div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { HotProductList } from '../../shared/types/dashboard.js'

defineProps<{
  list: HotProductList
}>()
</script>

<style lang="less" scoped>
.data-list {
  .list-item {
    display: grid;
    grid-template-columns: 0.8fr 3fr 1fr;
    align-items: center;
    gap: 0.1rem;
    padding: 0 0 0.2rem;
    font-size: 0.14rem;
    &.list-header {
      font-size: 0.16rem;
    }

    .item-order {
      // align-self: self-end;
      align-self: center;
      width: 0.3rem;
      height: 0.3rem;
      margin: 0 auto;
      line-height: 0.3rem;
      font-size: 0.16rem;
      text-align: center;
      border-radius: 0.04rem;
      border-width: 1px;
      border-style: solid;
      border-color: transparent;
      color: #f7f7f7;
      font-weight: 600;
    }

    &:nth-of-type(2) {
      .item-order {
        color: #111010;
        background-color: color-mix(in srgb, rgb(227, 190, 5) 90%, transparent);
      }
    }

    &:nth-of-type(3) {
      .item-order {
        color: #111010;
        background-color: color-mix(in srgb, rgb(193, 205, 218) 90%, transparent);
      }
    }

    &:nth-of-type(4) {
      .item-order {
        color: #111010;
        background-color: color-mix(in srgb, #bf8543 90%, transparent);
      }
    }

    .data {
      &:first-child {
        text-align: center;
      }

      &:last-child {
        text-align: right;
      }
    }

    .item-name-ratio {
      overflow: hidden;
      white-space: nowrap;

      .item-name {
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 2.8;
      }

      .item-ratio {
        height: 0.06rem;
        border-radius: 4px;
        background: linear-gradient(to right, #4da3ff, rgba(77, 163, 255, 0.3));
      }
    }
  }
}
</style>
