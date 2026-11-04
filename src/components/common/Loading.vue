<template>
  <div class="loading">
    <div class="spinner"></div>
    <p>数据加载中...</p>
  </div>
</template>

<style lang="less" scoped>
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  color: #00d8ff;
  font-size: 0.28rem;

  .spinner {
    width: 0.5rem;
    height: 0.5rem;
    border: 3px solid rgba(0, 216, 255, 0.2);
    border-top-color: #00d8ff;
    border-radius: 50%;
    animation: rotate 1s linear infinite;
  }
}

@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}
</style>
