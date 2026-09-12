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
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { type CityPoint, cityList } from '@/data/earth'
import { createCityLabel } from '@/utils/cityLabel'
import { lonLatToVector3 } from '@/utils/geo'
import { createFlightLine } from '@/utils/earthLine'

const EARTH_RADIUS = 1.5
const ATMOSPHERE_RADIUS = 1.56
const CITY_RADIUS = 1.53
const CAMERA_FOCUS_DISTANCE = 3.2

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
let controls: OrbitControls | null = null

let earth: THREE.Mesh | null = null
let earthTexture: THREE.Texture | null = null
let atmosphere: THREE.Mesh | null = null
let stars: THREE.Points | null = null
let cityPoints: THREE.Group | null = null
let cityCores: THREE.Mesh[] = []
let cityLabels: {
  group: THREE.Group
  label: THREE.Sprite
  rings: THREE.Mesh[]
  core: THREE.Mesh
  glow: THREE.Mesh
  pillar: THREE.Mesh
}[] = []

// 鼠标现在指向的城市
let hoveredCity: THREE.Group | null = null

// 当前镜头聚焦城市
let focusingCity: THREE.Group | null = null

// 点击选中的城市
const selectedCity = ref<CityPoint | null>(null)

// 聚焦城市当前的世界坐标
const currentCityWorldPosition = new THREE.Vector3()

let flightLines: THREE.Group | null = null
let flightCurves: THREE.QuadraticBezierCurve3[] = []
let flightParticles: THREE.Mesh[] = []
let raycaster = new THREE.Raycaster()
let mouse = new THREE.Vector2()

let animationId = 0

// 相机聚焦动画
let isFocusing = false

// 当前是否已经完成城市聚焦
let isFocused = false

// 相机动画起点
const cameraStartPosition = new THREE.Vector3()
const controlsStartTarget = new THREE.Vector3()

// 相机动画终点
const cameraEndPosition = new THREE.Vector3()

// 动画开始时间
let focusStartTime = 0

// 动画持续时间
const focusDuration = 1200

// Earth 旋转动画
const earthStartQuaternion = new THREE.Quaternion()
const earthEndQuaternion = new THREE.Quaternion()

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

  // 创建 OrbitControls
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.minDistance = 2
  controls.maxDistance = 10

  // 创建 Earth 几何体
  const geometry = new THREE.SphereGeometry(EARTH_RADIUS, 64, 64)

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
  const geometry = new THREE.SphereGeometry(ATMOSPHERE_RADIUS, 64, 64)
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
  core.userData.clickable = true

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
  glow.userData.clickable = false

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
    ring.userData.clickable = false
    group.add(ring)
    rings.push(ring)
  }

  // 城市光柱
  const pillarHeight = 0.35
  const pillarGeometry = new THREE.CylinderGeometry(0.012, 0.025, pillarHeight, 8, 1, true)

  // 默认 CylinderGeometry 是以中心为原点
  // 向上移动一般，让光柱的底部位于城市位置
  pillarGeometry.translate(0, pillarHeight / 2, 0)

  const pillarMaterial = new THREE.ShaderMaterial({
    // color: 0x00ffff,
    transparent: true,
    // opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide,
    uniforms: {
      uColor: {
        value: new THREE.Color(0x00ffff),
      },
      uOpacity: {
        value: 0,
      },
    },
    vertexShader: `
      varying vec2 vUv;

      void main () {
        vUv = uv;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      uniform float uOpacity;

      varying vec2 vUv;

      void main() {
        // 垂直方向渐变
        float heightGradient = 1.0 - vUv.y;

        // 水平方向渐变
        float edge = abs(vUv.x - 0.5) * 2.0;

        // 中心亮、边缘淡
        float sideGradient = 1.0 - smoothstep(0.0, 1.0, edge);

        // 最终透明度
        float alpha = heightGradient * sideGradient * uOpacity;

        gl_FragColor = vec4(uColor, alpha);
      }
    `,
  })
  const pillar = new THREE.Mesh(pillarGeometry, pillarMaterial)
  pillar.userData.clickable = false

  // 让光柱反光和地球表面的法线一直
  const radialDirection = position.clone().normalize()

  pillar.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), radialDirection)

  group.add(core)
  group.add(glow)
  group.add(pillar)

  // 创建城市标签
  const label = createCityLabel(city)
  label.position.set(0, 0.12, 0)
  label.userData.clickable = false
  group.add(label)

  // 设置城市位置
  group.position.copy(position)

  // 保存城市数据
  group.userData.city = city

  return {
    group,
    label,
    rings,
    core,
    glow,
    pillar,
  }
}

// 创建城市组
const createCityPoints = () => {
  cityPoints = new THREE.Group()

  cityList.forEach((city) => {
    const position = lonLatToVector3(city.longitude, city.latitude, CITY_RADIUS)

    const { group, label, rings, core, glow, pillar } = createCityPoint(position, city)

    cityPoints!.add(group)

    cityCores.push(core)

    cityLabels.push({
      group,
      label,
      rings,
      core,
      glow,
      pillar,
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

  const start = lonLatToVector3(beijing.longitude, beijing.latitude, CITY_RADIUS)
  const end = lonLatToVector3(shanghai.longitude, shanghai.latitude, CITY_RADIUS)

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

// 城市聚集视觉更新
const updateCityFocusVisuals = (time: number) => {
  cityLabels.forEach(({ group, core, glow, pillar }) => {
    const isFocusedCity = group === focusingCity

    const coreMaterial = core.material as THREE.MeshBasicMaterial
    const glowMaterial = glow.material as THREE.MeshBasicMaterial
    const pillarMaterial = pillar.material as THREE.ShaderMaterial

    if (isFocusedCity) {
      // 当前聚焦城市
      coreMaterial.color.set(0x00ffff)
      glowMaterial.color.set(0x00ffff)
      glowMaterial.opacity = 0.5
      glow.scale.setScalar(1.4)

      // 光柱呼
      const pulse = (Math.sin(time * 0.004) + 1) / 2

      pillarMaterial.uniforms.uOpacity!.value = 0.45 + pulse * 0.4

      // 光柱高度轻微变化
      pillar.scale.y = 0.85 + pulse * 0.3
    } else {
      // 其它城市
      coreMaterial.color.set(0xffd166)

      glowMaterial.color.set(0xffd166)
      glowMaterial.opacity = 0.12
      glow.scale.setScalar(1)

      pillarMaterial.uniforms.uOpacity!.value = 0
      pillar.scale.y = 1
    }
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
    clearHoverCity()
    return
  }

  const city = hoveredCity.userData.city as CityPoint

  console.log('点击城市：', city)

  selectedCity.value = city

  focusCity(hoveredCity)

  tooltip.value.visible = false
}

// 聚焦城市
const focusCity = (cityGroup: THREE.Group) => {
  if (!camera || !controls || !earth) {
    return
  }

  // 如果已经聚焦当前城市，则不重复执行聚焦动画
  if (focusingCity === cityGroup && isFocused) {
    return
  }

  // 当前正在聚集的城市
  focusingCity = cityGroup
  isFocused = false

  // 获取城市的世界坐标
  const cityWorldPosition = new THREE.Vector3()
  cityGroup.getWorldPosition(cityWorldPosition)

  // 城市方向
  const cityDirection = cityWorldPosition.clone().normalize()

  // 相机方向
  const cameraDirection = camera.position.clone().normalize()

  // 计算需要补充的旋转
  const alignmentQuaternion = new THREE.Quaternion()
  alignmentQuaternion.setFromUnitVectors(cityDirection, cameraDirection)

  // 计算 Earth 的目标旋转
  const targetQuaternion = alignmentQuaternion.clone().multiply(earth.quaternion)

  // 保存 Earth 当前旋转
  earthStartQuaternion.copy(earth.quaternion)

  // 保存 Earth 目标旋转
  earthEndQuaternion.copy(targetQuaternion)

  // 保存相机当前位置
  cameraStartPosition.copy(camera.position)

  // 保存 controls 当前 target
  controlsStartTarget.copy(controls.target)

  // 设置相机最终位置
  cameraEndPosition.copy(cameraDirection).multiplyScalar(CAMERA_FOCUS_DISTANCE)

  // 记录动画开始时间
  focusStartTime = performance.now()

  isFocusing = true

  // 动画期间禁止鼠标控制
  controls.enabled = false
}

// 用户手动操作 OrbitControls
const handleControlsStart = () => {
  if (isFocusing) {
    return
  }
  isFocused = false
  focusingCity = null
}

// 射线检测
const checkIntersection = () => {
  if (!camera) return

  raycaster.setFromCamera(mouse, camera)

  const intersects = raycaster.intersectObjects(cityCores, false)

  if (intersects.length === 0) {
    clearHoverCity()
    return
  }

  const core = intersects[0]!.object

  const cityGroup = core.parent

  if (!cityGroup) {
    clearHoverCity()
    return
  }

  setHoverCity(cityGroup)
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

// 缓动函数
const easeOut = (t: number) => {
  return 1 - Math.pow(1 - t, 3)
}

// 动画
const animate = () => {
  animationId = requestAnimationFrame(animate)

  // 当前时间
  const now = performance.now()

  // 要支持地球转动，暂时关闭
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

  // 更新城市标签
  updateCityLabels()

  // 更新城市聚焦视觉
  updateCityFocusVisuals(now)

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

  // 相机聚焦
  updateCameraFocus(now)

  controls?.update()

  if (renderer && scene && camera) {
    renderer.render(scene, camera)
  }
}

// 更新相机聚焦
const updateCameraFocus = (now: number) => {
  if (!isFocusing || !camera || !controls || !earth || !focusingCity) {
    return
  }

  const elapsed = now - focusStartTime

  let progress = elapsed / focusDuration

  if (progress >= 1) {
    progress = 1
  }

  // easeOut
  const easedProgress = easeOut(progress)

  // Earth 旋转
  earth.quaternion.slerpQuaternions(earthStartQuaternion, earthEndQuaternion, easedProgress)

  // 获取城市旋转后的世界坐标
  focusingCity.getWorldPosition(currentCityWorldPosition)

  // target 移动
  controls.target.copy(currentCityWorldPosition)

  // 相机移动
  camera.position.lerpVectors(cameraStartPosition, cameraEndPosition, easedProgress)

  // 动画结束
  if (progress >= 1) {
    isFocusing = false
    camera.position.copy(cameraEndPosition)

    if (focusingCity) {
      focusingCity.getWorldPosition(currentCityWorldPosition)
      controls.target.copy(currentCityWorldPosition)
    }
    controls.enabled = true
    isFocused = true
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

  controls?.addEventListener('start', handleControlsStart)
})

// 在卸载前
onBeforeUnmount(() => {
  cancelAnimationFrame(animationId)

  window.removeEventListener('resize', resize)
  containerRef.value?.removeEventListener('mousemove', handleMouseMove)
  containerRef.value?.removeEventListener('click', handleClick)

  // 释放 earth
  earth?.geometry.dispose()
  earthTexture?.dispose()
  if (earth?.material instanceof THREE.Material) {
    earth.material.dispose()
  }

  // 释放 atmosphere
  atmosphere?.geometry.dispose()
  if (atmosphere?.material instanceof THREE.Material) {
    atmosphere.material.dispose()
  }

  // 释放 Stars
  stars?.geometry.dispose()
  if (stars?.material instanceof THREE.Material) {
    stars.material.dispose()
  }

  // 释放 Renderer
  renderer?.dispose()
  renderer?.domElement.remove()

  // 释放 OrbitControls
  controls?.removeEventListener('start', handleControlsStart)
  controls?.dispose()
  controls = null
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
