<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import * as THREE from 'three'

const containerRef = ref<HTMLDivElement | null>(null)

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer

let cubeGroup: THREE.Group
let animationId = 0

// 创建立方体边线

function createCube() {
  // 创建一个组，统一管理立方体的所有线条
  cubeGroup = new THREE.Group()

  // 立方体尺寸
  const size = 2

  // 创建立方体几何体
  const geometry = new THREE.BoxGeometry(size, size, size)

  // 提取立方体的边线
  // BoxGeometry 有 6 个面
  // EdgesGeometry 会提取几何体的边缘
  // 最终形成 12 条立方体边线
  const edges = new THREE.EdgesGeometry(geometry)

  // 获取边线顶点数据
  const positions = edges.getAttribute('position')

  // 创建颜色数组
  const colors: number[] = []

  // 不同边使用不同颜色
  // 立方体边框颜色
  // 以蓝色为主，少量青色辅助
  const edgeColors = [
    new THREE.Color('#168CFF'),
    new THREE.Color('#168CFF'),
    new THREE.Color('#168CFF'),
    new THREE.Color('#168CFF'),
    new THREE.Color('#168CFF'),
    new THREE.Color('#168CFF'),
    new THREE.Color('#168CFF'),
    new THREE.Color('#168CFF'),

    // 少量辅助色
    new THREE.Color('#55DFFF'),
    new THREE.Color('#55DFFF'),
    new THREE.Color('#55DFFF'),

    // 最后一条边使用主色
    new THREE.Color('#168CFF'),
  ]

  // EdgesGeometry 使用 LineSegments
  // 每两个顶点构成一条独立线段
  for (let i = 0; i < positions.count; i++) {
    // 当前线段索引
    const edgeIndex = Math.floor(i / 2)

    // 根据线段索引选择颜色
    const color = edgeColors[edgeIndex % edgeColors.length]!

    // 为当前顶点添加 RGB
    colors.push(color.r, color.g, color.b)
  }

  // 将颜色数据绑定到几何体
  edges.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))

  // ----------------------------------
  // 第一层：外围柔和光晕
  // ----------------------------------

  const glowMaterial = new THREE.LineBasicMaterial({
    vertexColors: true,

    // 降低透明度
    transparent: true,
    opacity: 0.8,

    // 避免透明线条写入深度
    depthWrite: false,

    // 使用叠加混合
    blending: THREE.AdditiveBlending,
  })

  // 创建外围光晕线条
  const glowLines = new THREE.LineSegments(edges, glowMaterial)

  // 稍微放大，形成外围光晕
  glowLines.scale.setScalar(1.025)

  // ----------------------------------
  // 第二层：清晰发光线条
  // ----------------------------------

  const lineMaterial = new THREE.LineBasicMaterial({
    vertexColors: true,

    transparent: true,
    opacity: 0.95,

    depthWrite: false,

    blending: THREE.AdditiveBlending,
  })

  // 创建清晰线条
  const cubeLines = new THREE.LineSegments(edges, lineMaterial)

  // ----------------------------------
  // 第三层：核心亮线
  // ----------------------------------

  const coreMaterial = new THREE.LineBasicMaterial({
    color: 0x168cff,

    transparent: true,
    opacity: 0.65,

    depthWrite: false,

    blending: THREE.AdditiveBlending,
  })

  // 创建核心线条
  const coreLines = new THREE.LineSegments(edges, coreMaterial)

  // ----------------------------------
  // 添加到立方体组
  // ----------------------------------

  cubeGroup.add(glowLines)
  cubeGroup.add(cubeLines)
  cubeGroup.add(coreLines)

  // ----------------------------------
  // 设置初始角度
  // ----------------------------------

  // // 绕 X 轴倾斜
  // cubeGroup.rotation.x = -0.35

  // // 绕 Y 轴倾斜
  // cubeGroup.rotation.y = 0.45

  // // 绕 Z 轴轻微倾斜
  // cubeGroup.rotation.z = -0.15
  cubeGroup.rotation.set(-0.35, 0.35, 0)

  // 添加到场景
  scene.add(cubeGroup)

  // 返回资源，方便组件销毁时释放
  return {
    geometry,
    edges,
    glowMaterial,
    lineMaterial,
    coreMaterial,
  }
}

let cubeResources: ReturnType<typeof createCube> | undefined

function initScene() {
  if (!containerRef.value) return

  // 创建场景
  scene = new THREE.Scene()

  // 创建相机
  camera = new THREE.PerspectiveCamera(
    45,
    containerRef.value.clientWidth / containerRef.value.clientHeight,
    0.1,
    100,
  )

  camera.position.set(0, 0, 8)
  camera.lookAt(0, 0, 0)

  // 创建渲染器
  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  })

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  renderer.setSize(containerRef.value.clientWidth, containerRef.value.clientHeight)

  renderer.setClearColor(0x000000, 0)

  containerRef.value.appendChild(renderer.domElement)

  // 创建立方体
  cubeResources = createCube()
}

function animate() {
  animationId = requestAnimationFrame(animate)

  // 缓慢旋转
  cubeGroup.rotation.y += 0.003
  cubeGroup.rotation.x += 0.0015

  renderer.render(scene, camera)
}

// 窗口尺寸变化
function handleResize() {
  if (!containerRef.value) return

  const width = containerRef.value.clientWidth
  const height = containerRef.value.clientHeight

  camera.aspect = width / height
  camera.updateProjectionMatrix()

  renderer.setSize(width, height)
}

onMounted(() => {
  initScene()

  animate()

  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId)

  window.removeEventListener('resize', handleResize)

  if (cubeGroup) {
    scene.remove(cubeGroup)
  }

  if (cubeResources) {
    cubeResources.geometry.dispose()
    cubeResources.edges.dispose()

    cubeResources.glowMaterial.dispose()
    cubeResources.lineMaterial.dispose()
  }

  renderer?.dispose()

  renderer?.domElement.remove()
})
</script>

<template>
  <div class="loading-cube">
    <div ref="containerRef" class="cube-canvas"></div>

    <div class="loading-info">
      <div class="loading-title">INITIALIZING</div>

      <!-- <div class="loading-subtitle">THREE.JS SCENE</div> -->

      <div class="loading-progress">
        <span></span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.loading-cube {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #02070d;
  z-index: 100;
}

.cube-canvas {
  width: 100%;
  height: 280px;
}

.cube-canvas :deep(canvas) {
  display: block;
  width: 100%;
  height: 100%;
}

.loading-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.loading-title {
  font-size: 15px;
  letter-spacing: 5px;
  color: #9ce8ff;
  text-shadow: 0 0 8px rgba(50, 180, 255, 0.6);
}

.loading-subtitle {
  margin-top: 12px;
  font-size: 10px;
  letter-spacing: 3px;
  color: rgba(120, 180, 220, 0.55);
}

.loading-progress {
  position: relative;
  width: 160px;
  height: 2px;
  margin-top: 22px;
  overflow: hidden;
  background: rgba(50, 120, 180, 0.2);
}

.loading-progress span {
  position: absolute;
  width: 40%;
  height: 100%;
  background: #48caff;
  box-shadow: 0 0 8px #48caff;
  animation: loading 1.8s ease-in-out infinite;
}

@keyframes loading {
  0% {
    left: -40%;
  }

  100% {
    left: 100%;
  }
}
</style>
