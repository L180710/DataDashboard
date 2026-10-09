<template>
  <header class="header flex space-x align-center">
    <div class="header-left">2026-08-28 16:45:40</div>
    <svg
      class="header-center"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1920 100"
      width="1920"
      height="100"
    >
      <defs>
        <!-- 主横线渐变 -->
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#2c78b8" stop-opacity="0.15" />
          <stop offset="25%" stop-color="#4facfe" stop-opacity="0.9" />
          <stop offset="50%" stop-color="#66e6ff" stop-opacity="1" />
          <stop offset="75%" stop-color="#4facfe" stop-opacity="0.9" />
          <stop offset="100%" stop-color="#2c78b8" stop-opacity="0.15" />
        </linearGradient>
        <!-- 中间标题光晕 -->
        <radialGradient id="titleGlow">
          <stop offset="0%" stop-color="#43dfff" stop-opacity="0.28" />
          <stop offset="100%" stop-color="#43dfff" stop-opacity="0" />
        </radialGradient>
      </defs>
      <!-- 主线 -->
      <polyline
        points="0,28 600,28 650,78 1270,78 1320,28 1920,28"
        fill="none"
        stroke="url(#lineGradient)"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <!-- 标题背后的光 -->
      <!-- <ellipse cx="960" cy="42" rx="250" ry="45" fill="url(#titleGlow)" /> -->
      <text
        x="960"
        y="36"
        text-anchor="middle"
        dominant-baseline="middle"
        font-family="Arial, Microsoft YaHei, sans-serif"
        font-size="42"
        font-weight="600"
        letter-spacing="6"
        fill="#a9a9a9"
      >
        数据可视化
      </text>
      <polyline
        points="290,53 490,53 520,78"
        fill="none"
        stroke="#4facfe"
        stroke-width="2"
        opacity="0.65"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <circle cx="520" cy="78" r="3.5" fill="#59dcff" />
      <polyline
        points="1630,53 1430,53 1400,78"
        fill="none"
        stroke="#4facfe"
        stroke-width="2"
        opacity="0.65"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <circle cx="1400" cy="78" r="3.5" fill="#59dcff" />
    </svg>

    <div class="header-right">
      {{ selectedCity ? selectedCity.name : '全国' }}
      <span v-if="selectedCity" class="reset-btn" @click="handleReset">[ 全国 ]</span>
    </div>
  </header>
</template>

<script setup lang="ts">
import type { City } from '../../shared/types/city'

// 接收父组件的属性
defineProps<{
  selectedCity: City | null
}>()

// 向父组件发送事件
const emit = defineEmits<{
  reset: []
}>()

const handleReset = () => {
  emit('reset')
}
</script>

<style lang="less" scoped>
.header {
  position: relative;
  justify-content: space-between;
  column-gap: 10px;
  padding: 0.3rem 0.3rem 0.2rem;
  color: #e3e6f1;
  flex-shrink: 0;

  .header-left,
  .header-right {
    padding-top: 0.4rem;
    font-size: 0.22rem;
  }

  .header-center {
    position: absolute;
    width: 100%;
    pointer-events: none;
  }

  .reset-btn {
    padding-left: 6px;
    cursor: pointer;
    &:hover {
      color: #fff;
    }
  }
}
</style>
