<template>
  <div class="wrapper flex flex-col">
    <Header :selectedCity="selectedCity" @reset="handleResetNational" />
    <main class="main flex space-x">
      <aside class="main-left flex flex-col">
        <moduleTemp title="核心指标">
          <DataList v-if="selectedCityId" :columns="2" :list="processedKeyData" />
        </moduleTemp>

        <moduleTemp title="订单数趋势" :flex="1">
          <OrderChart v-if="orderTrend" :order-trend-list="orderTrend" />
        </moduleTemp>

        <moduleTemp title="销售额趋势" :flex="1">
          <SalesChart v-if="salesTrend" :sale-trend-list="salesTrend" />
        </moduleTemp>
      </aside>

      <section class="main-center flex flex-col">
        <DataList v-if="selectedCityId" :columns="4" :list="processedTodayData" />

        <Earth
          :selectedCity="selectedCity"
          :refresh-key="earthRefreshKey"
          @select-city="handleSelectCity"
        />

        <moduleTemp title="最新订单" class="latest-order-module">
          <OrderLatestList v-if="latestOrder" :list="latestOrder" />
        </moduleTemp>
      </section>
      <aside class="main-right flex flex-col">
        <moduleTemp title="用户统计" :flex="1.2">
          <UserChart v-if="userStatistics" :user-statistics="userStatistics" />
        </moduleTemp>

        <moduleTemp title="热门商品TOP5">
          <HotProductList v-if="hotProduct" :list="hotProduct" />
        </moduleTemp>

        <moduleTemp title="渠道来源占比" :flex="1">
          <ChannelChart v-if="channelStatistics" :channel-statistics="channelStatistics" />
        </moduleTemp>
      </aside>
    </main>

    <!-- Loading / Error 覆盖层 -->
    <div v-if="loading || error" class="status-mask">
      <Loading v-if="loading" />

      <ErrorState v-else-if="error" :message="error" @retry="handleRetry" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
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
import type { City } from '../../shared/types/city'
import Loading from '@/components/common/Loading.vue'
import ErrorState from '@/components/common/ErrorState.vue'

const dashboardStore = useDashboardStore()

// 响应状态
const {
  selectedCityId,
  processedKeyData,
  salesTrend,
  orderTrend,
  processedTodayData,
  latestOrder,
  userStatistics,
  hotProduct,
  channelStatistics,
  loading,
  error,
} = storeToRefs(dashboardStore)

// 响应方法
const { selectCity } = dashboardStore

// 选中城市
const selectedCity = ref<City | null>(null)

// Earth 城市数据刷新标识
const earthRefreshKey = ref(0)

onMounted(() => {
  handleResetNational()
})

// 重新请求当前城市的数据
const handleRetry = async () => {
  // 1、通知 Earth 重新获取城市数据
  earthRefreshKey.value++

  // 2、重新请求当前城市的 Dashboard 数据
  await selectCity(selectedCityId.value ?? undefined)
}

// 返回全国
const handleResetNational = async () => {
  selectedCity.value = null
  await selectCity()
}

// 选中城市
const handleSelectCity = async (city: City) => {
  selectedCity.value = city
  await selectCity(city.cityId)
}
</script>

<style lang="less" scoped>
.wrapper {
  position: relative;
  display: flex;
  overflow: hidden;
  width: 100vw;
  height: 100vh;

  // BI 主体
  .main {
    overflow: hidden;
    flex: 1;
    column-gap: 0.15rem;
    padding: 0.2rem 0.2rem;

    .main-left,
    .main-right {
      overflow: hidden;
      width: 28%;
      height: 100%;
      justify-content: space-between;
      row-gap: 0.15rem;
      flex-shrink: 0;

      .module-container {
        color: #fff;
      }
    }

    .main-center {
      display: flex;
      flex-direction: column;
      flex: 1;
    }
  }

  .status-mask {
    position: absolute;
    inset: 0;
    z-index: 999;

    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #010616;
    opacity: 0.98;
  }
}
</style>
