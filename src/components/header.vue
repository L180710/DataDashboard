<template>
  <header class="header flex space-x align-center">
    <div class="header-left">2026-08-28 16:45:40 星期四</div>
    <div class="header-center">数据可视化</div>
    <div class="header-right">全国</div>
  </header>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.header {
  position: relative;
  height: 12vh;
  justify-content: space-between;
  column-gap: 10px;
  padding: 0 0.3rem;
  color: #fff;
  flex-shrink: 0;

  .header-left,
  .header-right {
    font-size: 0.26rem;
    opacity: 0.6;
  }

  .header-center {
    position: absolute;
    width: 100%;
    text-align: center;
    font-size: 0.4rem;
    font-weight: 500;
    opacity: 0.9;
    padding-bottom: 0.2rem;

    background:
      linear-gradient(90deg, @corner-color, @corner-color) bottom / 50% 1px no-repeat,
      linear-gradient(-120deg, transparent 49.5%, @corner-color 50%, transparent 50%) left top / 48%
        100% no-repeat,
      linear-gradient(120deg, transparent 49.5%, @corner-color 50%, transparent 50%) right top / 48%
        100% no-repeat,
      linear-gradient(90deg, @corner-color, @corner-color) top left 19% / 5% 1px no-repeat,
      linear-gradient(90deg, @corner-color, @corner-color) top right 19% / 5% 1px no-repeat,
      linear-gradient(-120deg, transparent 49.5%, @corner-color 50%, transparent 50%) left -3% top /
        48% 100% no-repeat,
      linear-gradient(120deg, transparent 49.5%, @corner-color 50%, transparent 50%) right -3% top /
        48% 100% no-repeat;

    filter: drop-shadow(0 0 5px @corner-color);
  }
}
</style>
