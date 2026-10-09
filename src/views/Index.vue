<template>
  <div class="wrapper flex flex-col">
    <!-- <Header :selectedCity="selectedCity" @reset="handleResetNational" /> -->
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

        <!-- <Earth v-if="selectedCityId" :selectedCity="selectedCity" @select-city="handleSelectCity" /> -->

        <moduleTemp title="最新订单">
          <OrderLatestList v-if="latestOrder" :list="latestOrder" />
        </moduleTemp>
      </section>

      <!-- <aside class="main-right flex flex-col">
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
      </aside> -->
    </main>
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
import { createDataList } from '@/utils/data/DataList'
import type { City } from '../../shared/types/city'

const dashboardStore = useDashboardStore()

// 响应状态
const {
  selectedCityId,
  processedKeyData,
  salesTrend,
  orderTrend,
  processedTodayData,
  latestOrder,
  loading,
  error,
} = storeToRefs(dashboardStore)

// 响应方法
const { selectCity } = dashboardStore

// 选中城市
const selectedCity = ref<City | null>(null)

onMounted(() => {
  // todo: 这里暂时默认选中的北京，后面对接完各模块数据后，再处理
  handleSelectCity({ cityId: 'beijing' })
})

// 选中城市操作
const handleSelectCity = (city: City) => {
  selectedCity.value = city
  selectCity(selectedCity.value.cityId)
}

// 今日数据
// const todayDataList = computed(() => {
//   return createDataList(dashboardData.value?.todayData!, 'today')
// })

// // 选中城市操作
// const handleSelectCity = async (city: City) => {
//   selectedCity.value = city

//   await dashboardStoreDel.fetchDashboard(city.id!)
// }

// // 返回全国
// const handleResetNational = async () => {
//   await dashboardStoreDel.fetchDashboard('national')
// }
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
