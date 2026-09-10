<template>
  <div ref="containerRef" class="three-container">
    <div
      v-if="tooltip.visible"
      class="city-tooltip"
      :style="{
        left: `${tooltip.x}px`,
        top: `${tooltip.y}px`,
      }"
    >
      <div class="tooltip-name">{{ tooltip.city?.name }}</div>
      <div class="tooltip-value">数据量：{{ tooltip.city?.value.toLocaleString() }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { type CityPoint, cityList } from '@/data/earth'
import { createCityLabel } from '@/utils/cityLabel'
import { lonLatToVector3 } from '@/utils/geo'
import { createFlightLine } from '@/utils/earthLine'

const containerRef = ref<HTMLDivElement | null>(null)
const tooltip = ref({
  visible: false,
  x: 0,
  y: 0,
  city: null as CityPoint | null,
})
let renderer: THREE.WebGLRenderer | null = null
let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null

let earth: THREE.Mesh | null = null
let earthTexture: THREE.Texture | null = null
let atmosphere: THREE.Mesh | null = null
let stars: THREE.Points | null = null
let cityPoints: THREE.Group | null = null
let cityLabels: { group: THREE.Group; label: THREE.Sprite; rings: THREE.Mesh[] }[] = []
let hoveredCity: THREE.Group | null = null
let flightLines: THREE.Group | null = null
let flightCurves: THREE.QuadraticBezierCurve3[] = []
let flightParticles: THREE.Mesh[] = []
let raycaster = new THREE.Raycaster()
let mouse = new THREE.Vector2()

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
  earthTexture = textureLoader.load('/textures/8k_earth_nightmap.jpg')

  // 创建材质
  const material = new THREE.MeshStandardMaterial({
    map: earthTexture,
  })

  // 创建 Mesh
  earth = new THREE.Mesh(geometry, material)
  scene.add(earth)

  // 添加大气层
  createAtmosphere()

  // 添加星星
  createStars()

  // 添加城市组
  createCityPoints()

  // 添加飞行线
  createFlightLines()

  // 添加粒子
  createFlightParticles()

  // 添加环境光
  const ambientLight = new THREE.AmbientLight(0xffffff, 1)
  scene.add(ambientLight)

  // 方向光
  const directionalLight = new THREE.DirectionalLight(0xffffff, 2)
  directionalLight.position.set(5, 3, 5)
  scene.add(directionalLight)

  animate()
}

// 创建大气层
const createAtmosphere = () => {
  const geometry = new THREE.SphereGeometry(1.56, 64, 64)
  const material = new THREE.ShaderMaterial({
    transparent: true,
    side: THREE.BackSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,

    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vViewDirection;

      void main() {
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vNormal = normalize(normalMatrix * normal);
        vViewDirection = normalize(-mvPosition.xyz);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,

    fragmentShader: `
      varying vec3 vNormal;
      varying vec3 vViewDirection;

      void main() {
        vec3 normal = normalize(vNormal);
        vec3 viewDirection = normalize(vViewDirection);

        float intensity = 1.0 - abs(dot(normal, viewDirection));
        intensity = pow(intensity, 3.0);
        vec3 color = vec3(0.05, 0.4, 1.0);
        gl_FragColor = vec4(color, intensity);
      }
    `,
  })

  atmosphere = new THREE.Mesh(geometry, material)

  scene?.add(atmosphere)
}

// 创建星星
const createStars = () => {
  const starCount = 1500
  const positions = new Float32Array(starCount * 3)

  for (let i = 0; i < starCount; i++) {
    const radius = THREE.MathUtils.randFloat(10, 30)
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    const x = radius * Math.sin(phi) * Math.cos(theta)
    const y = radius * Math.cos(phi)
    const z = radius * Math.sin(phi) * Math.sin(theta)

    positions[i * 3] = x
    positions[i * 3 + 1] = y
    positions[i * 3 + 2] = z
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  const material = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.04,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true,
    depthWrite: false,
  })

  stars = new THREE.Points(geometry, material)
  scene?.add(stars)
}

// 创建城市点修饰
const createCityPoint = (position: THREE.Vector3, city: CityPoint) => {
  const group = new THREE.Group()

  // 核心点
  const coreGeometry = new THREE.SphereGeometry(0.025, 16, 16)
  const coreMaterial = new THREE.MeshBasicMaterial({ color: 0xffd166 })
  const core = new THREE.Mesh(coreGeometry, coreMaterial)
  core.userData.city = city

  // 光晕
  const glowGeometry = new THREE.SphereGeometry(0.06, 16, 16)
  const glowMaterial = new THREE.MeshBasicMaterial({
    color: 0xffd166,
    transparent: true,
    opacity: 0.2,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  })
  const glow = new THREE.Mesh(glowGeometry, glowMaterial)

  // 创建圆环
  // const ringGeometry = new THREE.RingGeometry(0.05, 0.065, 32)
  // const ringMaterial = new THREE.MeshBasicMaterial({
  //   color: 0xffd166,
  //   transparent: true,
  //   opacity: 0,
  //   side: THREE.DoubleSide,
  //   depthWrite: false,
  // })
  // const ring = new THREE.Mesh(ringGeometry, ringMaterial)

  const rings: THREE.Mesh[] = []

  for (let i = 0; i < 3; i++) {
    const ringGeometry = new THREE.RingGeometry(0.05, 0.065, 32)
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xffd166,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      depthWrite: false,
    })

    const ring = new THREE.Mesh(ringGeometry, ringMaterial)
    group.add(ring)
    rings.push(ring)
  }

  group.add(core)
  group.add(glow)
  // group.add(ring)

  // 创建城市标签
  const label = createCityLabel(city)
  label.position.set(0, 0.12, 0)
  group.add(label)

  // 设置城市位置
  group.position.copy(position)

  // 保存城市数据
  group.userData.city = city

  return {
    group,
    label,
    rings,
  }
}

// 创建城市组
const createCityPoints = () => {
  cityPoints = new THREE.Group()

  cityList.forEach((city) => {
    const position = lonLatToVector3(city.longitude, city.latitude, 1.53)

    const { group, label, rings } = createCityPoint(position, city)

    cityPoints!.add(group)

    cityLabels.push({
      group,
      label,
      rings,
    })
  })
  earth?.add(cityPoints)
}

// 创建飞行线
const createFlightLines = () => {
  flightLines = new THREE.Group()

  const beijing = cityList.find((item) => item.name === '北京')
  const shanghai = cityList.find((item) => item.name === '上海')

  if (!beijing || !shanghai) {
    return
  }

  const start = lonLatToVector3(beijing.longitude, beijing.latitude, 1.53)
  const end = lonLatToVector3(shanghai.longitude, shanghai.latitude, 1.53)

  const { line, curve } = createFlightLine(start, end)
  flightLines.add(line)
  flightCurves.push(curve)
  earth?.add(flightLines)
}

// 创建粒子
const createFlightParticles = () => {
  flightParticles = []
  const geometry = new THREE.SphereGeometry(0.035, 12, 12)
  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
  })
  flightCurves.forEach(() => {
    const particle = new THREE.Mesh(geometry, material)
    flightParticles.push(particle)
    earth?.add(particle)
  })
}

// 添加正反面判断
const updateCityLabels = () => {
  if (!camera) return

  cityLabels.forEach(({ group, label }) => {
    const worldPosition = new THREE.Vector3()
    group.getWorldPosition(worldPosition)
    const normal = worldPosition.clone().normalize()
    const cameraDirection = camera!.position.clone().sub(worldPosition).normalize()
    const visible = normal.dot(cameraDirection) > 0.2
    label.visible = visible

    const distance = camera!.position.distanceTo(worldPosition)
    const scale = THREE.MathUtils.clamp(2.5 / distance, 0.5, 1.2)
    label.scale.set(0.65 * scale, 0.25 * scale, 1)
  })
}

// 鼠标事件监听
const handleMouseMove = (event: MouseEvent) => {
  if (!containerRef.value) return

  const rect = containerRef.value.getBoundingClientRect()
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

  checkIntersection()
}

// 点击事件
const handleClick = () => {
  if (!hoveredCity) {
    return
  }

  const city = hoveredCity.userData.city as CityPoint

  console.log('点击城市：', city)
}

// 射线检测
const checkIntersection = () => {
  if (!camera || !cityPoints) return

  raycaster.setFromCamera(mouse, camera)

  const intersects = raycaster.intersectObjects(cityPoints.children, true)

  if (intersects.length === 0) {
    clearHoverCity()
    return
  }

  let current: THREE.Object3D | null = intersects[0]!.object
  while (current) {
    if (current.userData.city) {
      setHoverCity(current)
      return
    }

    current = current.parent
  }
  clearHoverCity()
}

// 设置城市 hover
const setHoverCity = (cityGroup: THREE.Object3D) => {
  if (hoveredCity === cityGroup) {
    return
  }

  clearHoverCity()

  hoveredCity = cityGroup as THREE.Group

  const city = hoveredCity.userData.city as CityPoint

  tooltip.value.city = city
  tooltip.value.visible = true
}

// 取消城市 hover
const clearHoverCity = () => {
  hoveredCity = null

  tooltip.value.city = null
  tooltip.value.visible = false
}

// 3d 转 2d
const worldToScreen = (position: THREE.Vector3) => {
  if (!camera || !containerRef.value) {
    return null
  }

  const vector = position.clone()
  vector.project(camera)

  const width = containerRef.value.clientWidth
  const height = containerRef.value.clientHeight

  const x = ((vector.x + 1) / 2) * width
  const y = ((1 - vector.y) / 2) * height

  return {
    x,
    y,
  }
}

// 更新 tooltip 位置
const updateToolTipPosition = () => {
  if (!hoveredCity) {
    return
  }

  // 判断测试是否在地球正面
  if (!isCityVisible(hoveredCity)) {
    tooltip.value.visible = false
    return
  }

  const worldPosition = new THREE.Vector3()
  hoveredCity.getWorldPosition(worldPosition)

  const screenPosition = worldToScreen(worldPosition)

  if (!screenPosition) {
    return
  }

  tooltip.value.x = screenPosition.x
  tooltip.value.y = screenPosition.y
}

// 判断城市是否在地球正面
const isCityVisible = (cityGroup: THREE.Group) => {
  if (!camera) {
    return false
  }

  const worldPosition = new THREE.Vector3()
  cityGroup.getWorldPosition(worldPosition)

  const normal = worldPosition.clone().normalize()
  const cameraDirection = camera.position.clone().sub(worldPosition).normalize()

  return normal.dot(cameraDirection) > 0.2
}

// 动画
const animate = () => {
  animationId = requestAnimationFrame(animate)

  // 当前时间
  const now = performance.now()

  if (earth) {
    // earth.rotation.y += 0.002
  }

  if (stars) {
    stars.rotation.y += 0.00005
  }

  // 城市点：呼吸 + Hover 放大
  if (cityPoints) {
    const time = now * 0.003

    cityPoints.children.forEach((city, index) => {
      const breathScale = 1 + Math.sin(time + index) * 0.2
      const hoverScale = city === hoveredCity ? 1.4 : 1
      city.scale.setScalar(breathScale * hoverScale)
    })
  }

  // 城市 hover 雷达波
  cityLabels.forEach(({ group, rings }, index) => {
    if (group === hoveredCity) {
      rings.forEach((ring, ringIndex) => {
        const material = ring.material as THREE.MeshBasicMaterial
        const progress = (now * 0.001 + index * 0.3 + ringIndex * 0.33) % 1

        // 缓动后的进度
        const easedProgress = 1 - Math.pow(1 - progress, 3)
        const scale = 1 + easedProgress * 4
        ring.scale.setScalar(scale)
        material.opacity = 1 - progress
      })
    } else {
      rings.forEach((ring) => {
        const material = ring.material as THREE.MeshBasicMaterial
        material.opacity = 0
      })
    }
  })

  // 缓动函数
  const easeOut = (t: number) => {
    return 1 - Math.pow(1 - t, 3)
  }

  // 更新城市标签
  updateCityLabels()

  // 更新 Tooltip
  updateToolTipPosition()

  // 飞行粒子运动
  flightParticles.forEach((particle, index) => {
    const curve = flightCurves[index]
    if (!curve) return
    const progress = (now * 0.0002) % 1
    const position = curve.getPointAt(progress)
    particle.position.copy(position)
  })

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
  containerRef.value?.addEventListener('mousemove', handleMouseMove)
  containerRef.value?.addEventListener('click', handleClick)
})

// 在卸载前
onBeforeUnmount(() => {
  cancelAnimationFrame(animationId)

  window.removeEventListener('resize', resize)
  containerRef.value?.removeEventListener('mousemove', handleMouseMove)
  containerRef.value?.removeEventListener('click', handleClick)

  // 释放 three.js资源
  earth?.geometry.dispose()
  earthTexture?.dispose()
  if (earth?.material instanceof THREE.Material) {
    earth.material.dispose()
  }

  // atmosphere
  atmosphere?.geometry.dispose()
  if (atmosphere?.material instanceof THREE.Material) {
    atmosphere.material.dispose()
  }

  // Stars
  stars?.geometry.dispose()
  if (stars?.material instanceof THREE.Material) {
    stars.material.dispose()
  }

  // Renderer
  renderer?.dispose()
  renderer?.domElement.remove()
})
</script>

<style lang="less" scoped>
.three-container {
  position: relative;
  width: 100%;
  height: 100%;
  flex: 1;
}

.city-tooltip {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  padding: 0.1rem 0.15rem;
  color: #fff;
  background: rgba(0, 20, 60, 0.9);
  border: 1px solid #00d9ff;
  border-radius: 4px;
  pointer-events: none;
  transform: translate(10px, -100%);
  white-space: nowrap;

  .tooltip-name {
    font-size: 0.18rem;
    margin-bottom: 0.05rem;
  }
  .tooltip-value {
    font-size: 0.14rem;
    color: #00d9ff;
  }
}
</style>
