<template>
  <div ref="containerRef" class="three-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'

const containerRef = ref<HTMLDivElement | null>(null)

let renderer: THREE.WebGLRenderer | null = null
let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null

let earth: THREE.Mesh | null = null
let animationId = 0

const initThree = () => {
  if (!containerRef.value) return

  const container = containerRef.value

  const width = container.clientWidth
  const height = container.clientHeight

  // =========================
  // Scene
  // =========================

  scene = new THREE.Scene()

  // =========================
  // Camera
  // =========================

  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)

  camera.position.set(0, 0, 5)

  // =========================
  // Renderer
  // =========================

  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  })

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  renderer.setSize(width, height)

  container.appendChild(renderer.domElement)

  // =========================
  // Earth
  // =========================

  const geometry = new THREE.SphereGeometry(1.5, 64, 64)

  const material = new THREE.MeshBasicMaterial({
    color: 0x1265c5,
    wireframe: true,
    transparent: true,
    opacity: 0.5,
  })

  earth = new THREE.Mesh(geometry, material)

  scene.add(earth)

  // =========================
  // Animation
  // =========================

  animate()
}

const animate = () => {
  animationId = requestAnimationFrame(animate)

  if (earth) {
    earth.rotation.y += 0.002
  }

  if (renderer && scene && camera) {
    renderer.render(scene, camera)
  }
}

const resize = () => {
  if (!containerRef.value || !renderer || !camera) {
    return
  }

  const width = containerRef.value.clientWidth
  const height = containerRef.value.clientHeight

  camera.aspect = width / height

  camera.updateProjectionMatrix()

  renderer.setSize(width, height)
}

onMounted(() => {
  initThree()

  window.addEventListener('resize', resize)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId)

  window.removeEventListener('resize', resize)

  earth?.geometry.dispose()

  if (earth?.material instanceof THREE.Material) {
    earth.material.dispose()
  }

  renderer?.dispose()

  renderer?.domElement.remove()
})
</script>

<style scoped lang="less">
.three-container {
  width: 100%;
  height: 100%;
  flex: 1;
}
</style>
