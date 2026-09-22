<template>
  <div class="wrapper flex flex-col">
    <Header :selectedCity="selectedCity" @reset="handleResetNational" />
    <main class="main flex space-x">
      <aside class="main-left flex flex-col">
        <moduleTemp title="核心指标">
          <DataList v-if="dashboardData" :columns="2" :list="keyDataList" />
        </moduleTemp>

        <moduleTemp title="销售额趋势" :flex="1">
          <SalesChart v-if="dashboardData" :sale-trend-list="dashboardData?.salesTrend!" />
        </moduleTemp>

        <moduleTemp title="订单数趋势" :flex="1">
          <OrderChart v-if="dashboardData" :order-trend-list="dashboardData?.orderTrend!" />
        </moduleTemp>
      </aside>

      <section class="main-center flex flex-col">
        <DataList v-if="dashboardData" :columns="4" :list="todayDataList" />

        <Earth v-if="dashboardData" :selectedCity="selectedCity" @select-city="handleSelectCity" />

        <moduleTemp title="最新订单">
          <OrderLatestList v-if="dashboardData" :list="dashboardData?.latestOrders!" />
        </moduleTemp>
      </section>

      <aside class="main-right flex flex-col">
        <moduleTemp title="用户统计" :flex="1.2">
          <UserChart v-if="dashboardData" :user-statistics="dashboardData?.userStatistics!" />
        </moduleTemp>

        <moduleTemp title="热门商品TOP5">
          <HotProductList v-if="dashboardData" :list="dashboardData?.hotProductData!" />
        </moduleTemp>

        <moduleTemp title="渠道来源占比" :flex="1">
          <ChannelChart
            v-if="dashboardData"
            :channel-statistics="dashboardData?.channelStatistics!"
          />
        </moduleTemp>
      </aside>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useDashboardStore } from '@/stores/dashboard'
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
import { createDataList } from '@/utils/data/DataList'
import type { CityPoint } from '@/data/earth'

const dashboardStore = useDashboardStore()
const { selectedCityId, dashboardData, loading, error } = storeToRefs(dashboardStore)

onMounted(async () => {
  await dashboardStore.fetchDashboard('national')
})

// 选中城市
const selectedCity = ref<CityPoint | null>(null)

// 选中城市操作
const handleSelectCity = async (city: CityPoint) => {
  selectedCity.value = city
  await dashboardStore.fetchDashboard(city.id!)
}

// 核心指标
const keyDataList = computed(() => {
  return createDataList(dashboardData.value?.keyData!, 'key')
})

// 今日数据
const todayDataList = computed(() => {
  return createDataList(dashboardData.value?.todayData!, 'today')
})

// 返回全国
const handleResetNational = async () => {
  await dashboardStore.fetchDashboard('national')
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
