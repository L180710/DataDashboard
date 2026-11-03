<template>
  <main class="not-found">
    <header class="header">
      <div class="logo">
        <span class="logo-mark">✦</span>
        DataDashboard
      </div>

      <span class="error-code">ERROR 404</span>
    </header>

    <section class="content">
      <div class="scene">
        <NotFoundScene />
      </div>

      <div class="message" :class="{ 'is-visible': showMessage }">
        <p class="subtitle">PAGE NOT FOUND</p>

        <h1>页面未找到</h1>

        <p class="description">抱歉，您访问的页面似乎不存在，或者已经被移除。</p>

        <button class="home-button" @click="goHome">
          <span>←</span>
          返回数据大屏
        </button>
      </div>
    </section>

    <!-- <footer class="footer">
      <span>DATA DASHBOARD</span>
      <span>EXPLORE THE UNKNOWN</span>
    </footer> -->
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import NotFoundScene from './NotFoundScene.vue'

const router = useRouter()

const showMessage = ref(false)

let messageTimer: ReturnType<typeof setTimeout>

onMounted(() => {
  messageTimer = setTimeout(() => {
    showMessage.value = true
  }, 1600)
})

onBeforeUnmount(() => {
  clearTimeout(messageTimer)
})

function goHome() {
  router.push('/')
}
</script>

<style scoped lang="less">
.not-found {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow: hidden;
  color: #e8f4ff;
  background: #010616;
}

.header {
  position: absolute;
  z-index: 2;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 64px;
  padding: 0 5%;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 600;
}

.logo-mark {
  color: #20cfff;
  font-size: 24px;
  text-shadow: 0 0 15px #008cff;
}

.error-code {
  color: #5b789b;
  font-size: 11px;
  letter-spacing: 2px;
}

.content {
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 500px;
  padding: 20px 16px 50px;
}

.scene {
  position: absolute;
  inset: 0;
  width: 100%;
}

.message {
  position: relative;
  z-index: 1;
  margin-top: 320px;
  text-align: center;

  // 初始隐藏
  opacity: 0;

  // 淡入动画
  transition: opacity 3.6s ease;

  // 显示状态
  &.is-visible {
    opacity: 1;
  }
}

.subtitle {
  margin-bottom: 12px;
  color: #20cfff;
  font-size: 11px;
  letter-spacing: 5px;
}

.message h1 {
  margin: 0 0 18px;
  font-size: clamp(26px, 3vw, 34px);
  font-weight: 500;
  letter-spacing: 3px;
}

.description {
  max-width: 420px;
  color: #91a7c1;
  font-size: 13px;
  line-height: 1.8;
}

.home-button {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-top: 28px;
  padding: 12px 28px;
  color: #dff6ff;
  font-size: 13px;
  border: 1px solid #168fff;
  border-radius: 24px;
  background: rgba(0, 107, 255, 0.12);
  box-shadow: 0 0 20px rgba(0, 140, 255, 0.12);
  cursor: pointer;
  transition:
    background 0.25s,
    box-shadow 0.25s;
}

.home-button:hover {
  background: rgba(0, 140, 255, 0.25);
  box-shadow: 0 0 26px rgba(0, 140, 255, 0.3);
}

.home-button span {
  font-size: 18px;
}

.footer {
  position: relative;
  z-index: 2;
  display: flex;
  flex-shrink: 0;
  justify-content: space-between;
  padding: 18px 5%;
  color: #496482;
  font-size: 10px;
  letter-spacing: 1.5px;
  border-top: 1px solid rgba(49, 151, 255, 0.12);
}

@media (max-width: 600px) {
  .header {
    height: 56px;
  }

  .logo {
    font-size: 15px;
  }

  .content {
    min-height: 480px;
  }

  .message {
    margin-top: 190px;
  }

  .description {
    max-width: 300px;
  }

  .footer {
    font-size: 8px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .home-button {
    transition: none;
  }
}
</style>
