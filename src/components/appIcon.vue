<template>
  <i
    class="iconfont"
    :class="`icon-${name}`"
    :style="{
      color: color,
      fontSize: typeof size === 'number' ? `${size}px` : size,
    }"
  ></i>
</template>

<script setup lang="ts">
import type { IconName } from '@/types/icon'

interface Props {
  name: IconName
  color: string
  size?: number | string
}

withDefaults(defineProps<Props>(), {
  size: 24,
  color: '#00d9ff',
})
</script>

<style lang="less" scoped>
.iconfont {
  line-height: 1;
}
</style>
