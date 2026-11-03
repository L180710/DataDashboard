<template>
  <div ref="containerRef" class="particle-scene"></div>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import * as THREE from 'three'

// 1、 响应式变量
const containerRef = ref<HTMLDivElement | null>(null)

// 2、three.js 核心对象

// Scene：整个 3D 场景
let scene: THREE.Scene | null = null

// Camera: 决定从哪个角度观察场景
let camera: THREE.PerspectiveCamera | null = null

// Renderer：负责把 3D 场景绘制到 Canvas 上
let renderer: THREE.WebGLRenderer | null = null

// Points: 由大量粒子组成的对象
let particles: THREE.Points | null = null

// BufferGeometry: 存储每个粒子的顶点坐标
let geometry: THREE.BufferGeometry | null = null

// PointsMaterial: 所有粒子共有的材质
let material: THREE.PointsMaterial | null = null

// 3、动画及粒子数据

let animationId = 0
let resizeObserver: ResizeObserver | null = null

// 初始位置：每个粒子最开始所在的位置
let startPositions: Float32Array

// 当前渲染位置：每一帧都要更新的数据
let positions: Float32Array

// 目标位置：每个粒子最终要达到的文字轮廓位置
let targets: Float32Array

// 每个粒子随机运动参数
let randomOffsets: Float32Array

// 每个粒子的颜色
let colors: Float32Array

// 每个粒子的延迟时间
let delays: Float32Array

// 场景开始动画时间
let startTime = 0

// 组件是否已经销毁
let disposed = false

// 4、可调节参数
// 粒子大小
const PARTICLE_SIZE = 0.035

// 聚合动画持续的的时间
const ANIMATION_DURATION = 1.66

// 不同粒子的随机延迟范围: 1~1.2 秒
const MAX_DELAY = 1.55

// 文字在 3D 世界中的宽度
const TEXT_WIDTH = 7.5

//  5、缓动函数

/**
 * 让粒子不再是匀速运，开始慢、中加快、最后减慢
 * t 的取值范围 0 ~ 1
 */
const easeInOutCubic = (t: number) => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

// 6、获取 404 文字轮廓
/**
 * 使用 canvas 绘制 404，读取文字所有不透明像素，把像素坐标转换成 three.js 的三维坐标
 * 返回 Float32Array,里面存放每个粒子的目标坐标
 */
const createTextTargets = () => {
  // 创建一个离屏 Canvas，不需要把它插入页面 DOM
  const canvas = document.createElement('canvas')

  const ctx = canvas.getContext('2d')

  if (!ctx) {
    return new Float32Array(0)
  }

  // Canvas 像素尺寸
  canvas.width = 800
  canvas.height = 300

  // 清空画布
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // 设置文字样式

  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 220px Arial, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  // 绘制 404
  ctx.fillText('404', 400, 150)

  // 获取 Canvas 所有像素数据
  const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data

  // 保存文字轮廓对应的例子坐标
  const points: number[] = []

  // 每隔几个像素采样一次，数值越小，粒子越密集
  const step = 5

  for (let y = 0; y < canvas.height; y += step) {
    for (let x = 0; x < canvas.width; x += step) {
      // pixels 是一个 Unit8ClampedArray,里面存储的是 Canvas 每个像素的 RGBA 数据
      // RGBA 数据中，每个像素占据 4 个位置，alpha 表示透明度
      // y * canvas.width：计算当前像素所在行之前，一共有多少个像素
      // + x：当前像素在这一行中的偏移量
      const index = (y * canvas.width + x) * 4

      // 从每一个像素 RGBA 中取像素
      const alpha = pixels[index + 3]

      // 只采集文字区域
      if (alpha && alpha > 128) {
        // 将 Canvas 坐标转换为 Threes.js 坐标

        // X：从左向右
        const worldX = (x / canvas.width - 0.5) * TEXT_WIDTH

        // Y: Canvas  向下为正( Three.js 向上为正)
        const worldY = (0.5 - y / canvas.height) * 2.8 + 1

        // Z: 先设置为 0
        const worldZ = 0

        points.push(worldX, worldY, worldZ)
      }
    }
  }

  return new Float32Array(points)
}

// 7、创建粒子
/**
 * 作用：
 * 1、获取文字目标坐标
 * 2、创建粒子的随机初始位置
 * 3、创建粒子颜色
 * 4、创建粒子的随机运动参数
 * 5、使用 BufferGeometry 保存顶点
 * 6、使用 PointsMaterial 设置粒子外观
 * 7、将粒子加入 Scene
 */
const createParticles = () => {
  if (!scene) return

  // 获取文字目标坐标 todo
  targets = createTextTargets()

  // 每三个数值表示一个例子的 XYZ 坐标
  const count = targets.length / 3

  // 初始化所有粒子数据
  startPositions = new Float32Array(targets.length)
  positions = new Float32Array(targets.length)
  randomOffsets = new Float32Array(targets.length)
  colors = new Float32Array(targets.length)

  // 每个粒子延迟时间
  delays = new Float32Array(count)

  for (let i = 0; i < count; i++) {
    // 当粒子在数组中的起始索引
    const index = i * 3

    // A、设置粒子初始位置
    const x = (Math.random() - 0.5) * 12
    const y = (Math.random() - 0.5) * 7
    const z = (Math.random() - 0.5) * 2

    startPositions[index] = x
    startPositions[index + 1] = y
    startPositions[index + 2] = z

    // positions 初始时与startPositions 相同，但后面只修改 positions
    positions[index] = x
    positions[index + 1] = y
    positions[index + 2] = z

    // B、设置随机运动参数
    randomOffsets[index] = Math.random() * Math.PI * 2
    randomOffsets[index + 1] = Math.random() * Math.PI * 2
    randomOffsets[index + 2] = Math.random() * Math.PI * 2

    // C、设置颜色
    // 随机产生不同深浅的蓝青色
    const cyan = Math.random()

    colors[index] = 0.12 + cyan * 0.2
    colors[index + 1] = 0.55 + cyan * 0.4
    colors[index + 2] = 1

    // D、设置粒子聚会延迟
    delays[i] = Math.random() * MAX_DELAY
  }

  // E、创建 BufferGeometry
  geometry = new THREE.BufferGeometry()

  // position： 每个粒子当前位置
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  // color：每个粒子的颜色
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  // F、创建粒子材质
  material = new THREE.PointsMaterial({
    // 粒子大小
    size: PARTICLE_SIZE,

    // 使用上面设置的顶点颜色
    vertexColors: true,

    // 开启透明度
    transparent: true,

    // 设置透明度值
    opacity: 0.95,

    // 关闭深度写入：减少透明粒子之间的深度缓冲冲突
    depthWrite: false,

    // 加法混合：让重叠的蓝色粒子产生反光感
    blending: THREE.AdditiveBlending,

    // 粒子大小随距离变化
    sizeAttenuation: true,
  })

  // G、创建 Points 对象
  particles = new THREE.Points(geometry, material)

  // 将粒子加入场景
  scene.add(particles)
}

// 8、创建 Three.js 场景
/**
 * 创建场景、相机、渲染器；
 * 舒适化粒子；
 * 启动动画。
 */

const createScene = () => {
  const container = containerRef.value

  if (!container) return

  // A、创建场景
  scene = new THREE.Scene()

  // 设置背景色
  scene.background = new THREE.Color('#030918')

  // B、创建透视相机
  camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100)

  // 相机向 Z 轴正方向移动
  camera.position.z = 10

  // C、创建 WebGL 渲染器
  renderer = new THREE.WebGLRenderer({
    // 开启抗锯齿
    antialias: true,
    alpha: false,
  })

  // 限制像素比，降低高分辨率屏幕的渲染压力
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))

  // 设置渲染尺寸
  renderer.setSize(container.clientWidth, container.clientHeight)

  // 将 Three.js 生成的 Canvas 添加到页面
  container.appendChild(renderer.domElement)

  // D、创建粒子
  createParticles()

  // 记录动画开始时间
  startTime = performance.now()

  // 启动动画循环
  animate()
}

// 9、动画循环
/**
 * 每一帧更新所有粒子的位置
 * 主要过程：
 * 1、计算动画经过的时间
 * 2、计算当前聚合进度
 * 3、根据缓动函数计算运动进度
 * 4、将粒子从初始位置移动到目标位置
 * 5、添加轻微的流动效果
 * 6、更新 BufferGeometry
 * 7、渲染场景
 */

const animate = () => {
  if (disposed || !renderer || !scene || !camera || !geometry) {
    return
  }

  // 请求浏览器在下一次绘制时执行 animate
  animationId = requestAnimationFrame(animate)

  // A、计算动画时间
  const elapsed = (performance.now() - startTime) / 1000

  // B、获取粒子位置属性
  const positionAttribute = geometry.getAttribute('position') as THREE.BufferAttribute
  const array = positionAttribute.array as Float32Array

  // C、更新每个粒子
  for (let i = 0; i < array.length; i += 3) {
    // 当前粒子编号
    const particleIndex = i / 3

    // 获取粒子的随机运动参数
    const offsetX = randomOffsets[i] || 0
    const offsetY = randomOffsets[i + 1] || 0
    const offsetZ = randomOffsets[i + 2] || 0

    // C1、计算每个粒子的独立动画进程
    const localElapsed = Math.max(0, elapsed - (delays[particleIndex] || 0))

    // 将时间转换成 0~1 的进度
    const progress = Math.min(localElapsed / ANIMATION_DURATION, 1)

    // 使用缓动函数
    const eased = easeInOutCubic(progress)

    // chao 越大，说明粒子越混乱
    // chao 越小，说明粒子越接近目标
    const chaos = 1 - eased

    // C2、计算初始位置
    const startX = startPositions[i] || 0
    const startY = startPositions[i + 1] || 0
    const startZ = startPositions[i + 2] || 0

    // C3、获取最终目标位置
    const targetX = targets[i] || 0
    const targetY = targets[i + 1] || 0
    const targetZ = targets[i + 2] || 0

    // C4、计算在混乱状态下的运动
    // const chaoticX = Math.sin(elapsed * 1.8 + offsetX) * 1.4
    // const chaoticY = Math.cos(elapsed * 1.5 + offsetY) * 1.2
    // const chaoticZ = Math.sin(elapsed * 2 + offsetZ) * 0.8

    const chaoticX = Math.sin(elapsed * 1.8 + offsetX) * 1
    const chaoticY = Math.cos(elapsed * 1.5 + offsetY) * 0.8
    const chaoticZ = Math.sin(elapsed * 2 + offsetZ) * 0.6

    // C5、计算聚合完成后的轻微流动
    const flowX = Math.sin(elapsed * 1.4 + offsetX) * 0.025
    const flowY = Math.cos(elapsed * 1.6 + offsetY) * 0.025
    const flowZ = Math.sin(elapsed + offsetZ) * 0.04

    // C6、插值计算最终位置
    array[i] = startX * (1 - eased) + targetX * eased + chaoticX * chaos + flowX * eased
    array[i + 1] = startY * (1 - eased) + targetY * eased + chaoticY * chaos + flowY * eased
    array[i + 2] = startZ * (1 - eased) + targetZ * eased + chaoticZ * chaos + flowZ * eased
  }

  // D、通知 three.js 顶点坐标已经改变
  positionAttribute.needsUpdate = true

  // E、整体轻微呼吸效果
  if (particles) {
    particles.position.y = Math.sin(elapsed * 0.8) * 0.025
  }

  // 粒子整体透明度轻微变化
  if (material) {
    material.opacity = 0.8 + Math.sin(elapsed * 2) * 0.15
  }

  // F、渲染场景
  renderer.render(scene, camera)
}

// 10、监听容器尺寸变化
/**
 * 单页面容器尺寸发生变化时， 同步更新相机和渲染器
 */
const handleResize = () => {
  const container = containerRef.value

  if (!container || !camera || !renderer) {
    return
  }

  const width = container.clientWidth
  const height = container.clientHeight

  if (!width || !height) {
    return
  }

  // 更新相机宽高比
  camera.aspect = width / height

  // 更新相机投影矩阵
  camera.updateProjectionMatrix()

  // 更新渲染器尺寸
  renderer.setSize(width, height)
}

// 11、vue 生命周期
onMounted(() => {
  // DOM 已经挂载，此时可以获取容器尺寸
  createScene()

  // 使用 ResizeObserver 观察容器变化
  if (containerRef.value) {
    resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(containerRef.value)
  }
})

// 12、释放 three.js 资源
onBeforeUnmount(() => {
  // 标记组件已经销毁
  disposed = true

  // 停止动画循环
  cancelAnimationFrame(animationId)

  // 停止尺寸监听
  resizeObserver?.disconnect()

  // 释放几何体
  geometry?.dispose()

  // 释放材质
  material?.dispose()

  // 释放 WebGL 渲染器
  renderer?.dispose()

  // 移除 Three.js 创建的 Canvas
  renderer?.domElement.remove()

  // 清空引用
  scene = null
  camera = null
  particles = null
  geometry = null
  material = null
  renderer = null
})
</script>

<style scoped lang="less">
.particle-scene {
  position: absolute;
  overflow: hidden;
  inset: 0;
}
.particle-scene :deep(canvas) {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
