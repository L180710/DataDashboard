<template>
  <div class="wrapper flex flex-col">
    <Header />
    <main class="main flex space-x">
      <aside class="main-left flex flex-col">
        <!-- 核心指标 -->
        <moduleTemp title="核心指标">
          <!-- <KeyDataCard /> -->
          <DataList :columns="2" :list="keyDataList" />
        </moduleTemp>
        <!-- 销售额趋势 -->
        <moduleTemp title="销售额趋势" :flex="1">
          <SalesChart />
        </moduleTemp>
        <!-- 订单数趋势 -->
        <moduleTemp title="订单数趋势" :flex="1">
          <OrderChart />
        </moduleTemp>
      </aside>
      <section class="main-center flex flex-col">
        <!--今日数据 -->
        <DataList :columns="4" :list="nowDataList" />
        <!-- 地球 -->
        <!-- <EarthScene /> -->
        <Earth />
        <!-- 最新订单 -->
        <moduleTemp title="最新订单">
          <OrderLatestList />
        </moduleTemp>
      </section>
      <aside class="main-right flex flex-col">
        <moduleTemp title="用户统计" :flex="1.2">
          <UserChart />
        </moduleTemp>
        <moduleTemp title="热门商品TOP5">
          <HotProductList />
        </moduleTemp>
        <moduleTemp title="渠道来源占比" :flex="1">
          <ChannelChart />
        </moduleTemp>
      </aside>
    </main>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue'
import moduleTemp from '@/components/common/ModuleTemp.vue'
import DataList from '@/components/DataList.vue'
import SalesChart from '@/components/SalesChart.vue'
import OrderChart from '@/components/OrderChart.vue'
import EarthScene from '@/components/EarthScene.vue'
import Earth from '@/components/Earth.vue'
import OrderLatestList from '@/components/OrderLatestList.vue'
import UserChart from '@/components/UserChart.vue'
import HotProductList from '@/components/HotProductList.vue'
import ChannelChart from '@/components/ChannelChart.vue'
import type { KeyDataList } from '@/types/dashboard.ts'

// 核心指标数据
const keyDataList: KeyDataList = [
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

// 今日数据
const nowDataList: KeyDataList = [
  {
    id: '1',
    icon: 'fangketou',
    title: '今日访问量',
    account: 1726,
    diff: 3,
    status: 1,
    color: '#6fadea',
  },
  {
    id: '2',
    icon: 'dingdanshuju',
    title: '今日订单数',
    account: 126,
    diff: 2.3,
    status: 1,
    color: '#d19a56',
  },
  {
    id: '3',
    icon: 'xiaoshouliang',
    title: '今日销售额',
    account: 8999,
    diff: 1,
    status: 0,
    color: '#dfc181',
  },
  {
    id: '4',
    icon: 'cengci',
    title: '新增用户数',
    account: 89,
    diff: 3.2,
    status: 1,
    color: '#73b4d7',
  },
]
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
    flex: 1;
    padding: 0.2rem 0.3rem;

    .main-left,
    .main-right {
      overflow: hidden;
      width: 30%;
      height: 100%;
      justify-content: space-between;
      row-gap: 0.15rem;

      .module-container {
        color: #fff;
      }
    }

    .main-center {
      overflow: hidden;
      justify-content: space-between;
      row-gap: 0.15rem;
      width: 50%;
    }
  }
}

.test {
  border: 1px solid #fff;
  flex: 1;
}
</style>
