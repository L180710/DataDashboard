<template>
  <div class="wrapper flex flex-col">
    <Header />
    <main class="main flex space-x">
      <aside class="main-left flex flex-col">
        <!-- 核心指标 -->
        <moduleTemp title="核心指标">
          <KeyDataCard />
        </moduleTemp>
        <!-- 销售额趋势 -->
        <moduleTemp title="销售额趋势">
          <SalesChart />
        </moduleTemp>
        <!-- 订单数趋势 -->
        <moduleTemp title="订单数趋势">
          <OrderChart />
        </moduleTemp>
      </aside>
      <section class="main-center">
        <!-- <img src="../assets/image.png" style="width: 100%; height: 4rem" /> -->
      </section>
      <aside class="main-right flex flex-col"></aside>
    </main>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue'
import moduleTemp from '@/components/common/ModuleTemp.vue'
import KeyDataCard from '@/components/KeyDataCard.vue'
import SalesChart from '@/components/SalesChart.vue'
import OrderChart from '@/components/OrderChart.vue'
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
      row-gap: 0.1rem;

      .module-container {
        color: #fff;
      }
    }

    .main-center {
      overflow: hidden;
      width: 50%;
    }
  }
}
</style>
