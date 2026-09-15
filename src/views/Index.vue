<template>
  <div class="wrapper flex flex-col">
    <Header :selectedCity="selectedCity" @reset="handleResetNational" />
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
        <Earth :selectedCity="selectedCity" @select-city="handleSelectCity" />
        <!-- 最新订单 -->
        <moduleTemp title="最新订单">
          <OrderLatestList :list="orderLatestList" />
        </moduleTemp>
      </section>
      <aside class="main-right flex flex-col">
        <moduleTemp title="用户统计" :flex="1.2">
          <UserChart />
        </moduleTemp>
        <moduleTemp title="热门商品TOP5">
          <HotProductList :list="hotProductList" />
        </moduleTemp>
        <moduleTemp title="渠道来源占比" :flex="1">
          <ChannelChart />
        </moduleTemp>
      </aside>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Header from '@/components/Header.vue'
import moduleTemp from '@/components/common/ModuleTemp.vue'
import DataList from '@/components/DataList.vue'
import SalesChart from '@/components/SalesChart.vue'
import OrderChart from '@/components/OrderChart.vue'
import Earth from '@/components/Earth.vue'
import OrderLatestList from '@/components/OrderLatestList.vue'
import UserChart from '@/components/UserChart.vue'
import HotProductList from '@/components/HotProductList.vue'
import ChannelChart from '@/components/ChannelChart.vue'
import type { CityPoint } from '@/data/earth'
import { dashboardData } from '@/data/dashboard'

// 选中城市
const selectedCity = ref<CityPoint | null>(null)

// 选中城市操作
const handleSelectCity = (city: CityPoint) => {
  selectedCity.value = city

  // console.log('父组件收到城市：', city)
}

const currentDashboardData = computed(() => {
  const cityId = selectedCity.value?.id ?? 'national'
  return dashboardData.find((item) => item.cityId === cityId)
})

// 核心指标数据
const keyDataList = computed(() => {
  return currentDashboardData.value?.keyData ?? []
})

// 今日数据
const nowDataList = computed(() => {
  return currentDashboardData.value?.todayData ?? []
})

// 最新订单
const orderLatestList = computed(() => {
  return currentDashboardData.value?.latestOrders ?? []
})

// 热门商品 TOP 5
const hotProductList = computed(() => {
  return currentDashboardData.value?.hotProductData ?? []
})

// 返回全国
const handleResetNational = () => {
  selectedCity.value = null
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
