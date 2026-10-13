<template>
  <div class="module-container flex flex-col" :style="{ '--flex': flex }">
    <div class="module-header flex align-items space-x">
      <h3 class="title">{{ title }}</h3>
    </div>
    <div class="module-main flex flex-col">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  flex?: number | 0
  title: string
}>()
</script>

<style lang="less" scoped>
.module-container {
  --corner-length: 0.3rem;
  --corner-width: 0.02rem;

  overflow: hidden;
  // min-height: 0;
  min-height: min-content;
  height: max-content;

  padding: 0.2rem 0.2rem 0.2rem;
  border: 1px solid rgba(0, 150, 255, 0.2);
  border-radius: 0.1rem;
  flex: var(--flex);

  background:
    /* 左上 */
    linear-gradient(@corner-color, @corner-color) left top / var(--corner-length)
      var(--corner-width) no-repeat,
    linear-gradient(@corner-color, @corner-color) left top / var(--corner-width)
      var(--corner-length) no-repeat,
    /* 右上 */ linear-gradient(@corner-color, @corner-color) right top / var(--corner-length)
      var(--corner-width) no-repeat,
    linear-gradient(@corner-color, @corner-color) right top / var(--corner-width)
      var(--corner-length) no-repeat,
    /* 左下 */ linear-gradient(@corner-color, @corner-color) left bottom / var(--corner-length)
      var(--corner-width) no-repeat,
    linear-gradient(@corner-color, @corner-color) left bottom / var(--corner-width)
      var(--corner-length) no-repeat,
    /* 右下 */ linear-gradient(@corner-color, @corner-color) right bottom / var(--corner-length)
      var(--corner-width) no-repeat,
    linear-gradient(@corner-color, @corner-color) right bottom / var(--corner-width)
      var(--corner-length) no-repeat,
    /* 右下 */ linear-gradient(@corner-color, @corner-color) right bottom / var(--corner-width)
      var(--corner-length) no-repeat;

  // 模块头部
  .module-header {
    padding-bottom: 0.26rem;

    .title {
      position: relative;
      font-size: 0.22rem;
      font-weight: 500;
      line-height: 0.22rem;
      color: #fff;
      letter-spacing: 0.05rem;

      text-shadow:
        0 0 3px #052a71,
        0 0 6px rgb(28 104 148 / 90%),
        0 0 12px rgb(6 40 78 / 70%);

      &::before {
        position: absolute;
        z-index: -1;
        content: '';
        left: 0.1rem;
        inset: 0;
        width: 120%;
        height: 110%;
        background: radial-gradient(
          ellipse at center,
          rgb(5 11 81) 0%,
          rgb(22 107 220 / 87%) 20%,
          rgb(9 51 131 / 40%) 70%,
          #0000000f 80%
        );

        filter: blur(4px);
      }
    }

    .operate {
      font-size: 0.25rem;
    }
  }

  // 模块内容
  .module-main {
    flex: 1;
    // min-height: 0;
    min-height: min-content;
  }
}
</style>
