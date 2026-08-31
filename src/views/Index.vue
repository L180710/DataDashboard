<template>
  <div class="wrapper flex flex-col">
    <Header />
    <main class="main flex space-x">
      <aside class="main-left">
        <!-- 核心指标 -->
        <moduleTemp :data="keyDataObj" />
        <!-- 销售额趋势 -->
        <!-- <moduleTemp :data="sales" /> -->
      </aside>
      <section class="main-center">
        <!-- <img src="../assets/image.png" style="width: 100%; height: 4rem" /> -->
      </section>
      <aside class="main-right"></aside>
    </main>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/header.vue'
import moduleTemp from '@/components/moduleTemp.vue'
import type { KeyDataObj } from '../types/dashboard'

// 核心指标
const keyDataObj: KeyDataObj = {
  title: '核心指标',
  list: [
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
  ],
}

// 销售额趋势
const sales = {
  title: '销售额趋势',
  list: {},
}
</script>

<style lang="less" scoped>
.wrapper {
  display: flex;
  overflow: hidden;
  width: 100vw;
  height: 100vh;

  // BI 主体
  .main {
    column-gap: 10px;
    padding: 0.2rem 0.3rem;

    .main-left,
    .main-right {
      overflow: hidden;
      width: 30%;
    }

    .main-center {
      overflow: hidden;
      width: 50%;
    }
  }
}
</style>
