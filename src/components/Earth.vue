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
let earthTexture: THREE.Texture | null = null

let animationId = 0

// 初始化
const initThree = () => {
  if (!containerRef.value) return

  const container = containerRef.value

  // 获取尺寸
  const width = container.clientWidth
  const height = container.clientHeight

  // 创建 Scenes
  scene = new THREE.Scene()

  // 创建 Camera
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
  camera.position.set(0, 0, 5)

  // 创建 Renderer
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(width, height)
  container.appendChild(renderer.domElement)

  // 创建 Earth 几何体
  const geometry = new THREE.SphereGeometry(1.5, 64, 64)

  // 创建纹理
  const textureLoader = new THREE.TextureLoader()
  earthTexture = textureLoader.load('/textures/8k_earth_daymap.jpg')
  // earthTexture = textureLoader.load('/textures/8k_earth_nightmap.jpg')
  // earthTexture = textureLoader.load('/textures/2k_earth_nightmap.jpg')

  // 创建材质
  const material = new THREE.MeshStandardMaterial({
    map: earthTexture,
  })

  // 创建 Mesh
  earth = new THREE.Mesh(geometry, material)
  scene.add(earth)

  // 创建大气层
  const atmosphereGeometry = new THREE.SphereGeometry(1.55, 64, 654)
  const atmosphereMaterial = new THREE.MeshBasicMaterial({
    color: 0x1688ff,
    transparent: true,
    opacity: 0.15,
  })
  const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial)

  scene.add(atmosphere)

  // 添加环境光
  const ambientLight = new THREE.AmbientLight(0xffffff, 1)
  scene.add(ambientLight)

  // 方向光
  const directionalLight = new THREE.DirectionalLight(0xffffff, 2)
  directionalLight.position.set(5, 3, 5)
  scene.add(directionalLight)

  animate()
}

// 动画
const animate = () => {
  animationId = requestAnimationFrame(animate)

  if (earth) {
    earth.rotation.y += 0.002
  }

  if (renderer && scene && camera) {
    renderer.render(scene, camera)
  }
}

// 响应大小
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

// 挂载
onMounted(() => {
  initThree()
  window.addEventListener('resize', resize)
})

// 在卸载前
onBeforeUnmount(() => {
  cancelAnimationFrame(animationId)

  window.removeEventListener('resize', resize)
  earth?.geometry.dispose()

  if (earth?.material instanceof THREE.Material) {
    earth.material.dispose()
  }
  renderer?.dispose()
  renderer?.domElement.remove()
  earthTexture?.dispose()
})
</script>

<style lang="less" scoped>
.three-container {
  width: 100%;
  height: 100%;
  flex: 1;
}
</style>
