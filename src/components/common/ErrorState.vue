<template>
  <div class="error-state">
    <div class="error-icon">!</div>

    <p>{{ message }}</p>

    <button @click="emit('retry')">重新加载</button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  message: string
}>()

const emit = defineEmits<{
  retry: []
}>()
</script>

<style lang="less" scoped>
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;

  color: #fff;
  font-size: 0.16rem;

  .error-icon {
    width: 0.42rem;
    height: 0.42rem;
    border: 2px solid #ff6464;
    border-radius: 50%;
    color: #ff6464;
    font-size: 0.28rem;
    text-align: center;
    line-height: 0.38rem;
  }

  button {
    padding: 0.08rem 0.2rem;
    color: #00d8ff;
    border: 1px solid #00d8ff;
    background: transparent;
    cursor: pointer;

    &:hover {
      background: rgba(0, 216, 255, 0.1);
    }
  }
}
</style>
