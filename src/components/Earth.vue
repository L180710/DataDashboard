<template>
  <div ref="containerRef" class="three-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { cityList } from '@/data/earth'
import { createCityLabel } from '@/utils/cityLabel'
import { lonLatToVector3 } from '@/utils/geo'
import { createFlightLine } from '@/utils/earthLine'

const containerRef = ref<HTMLDivElement | null>(null)
let renderer: THREE.WebGLRenderer | null = null
let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null

let earth: THREE.Mesh | null = null
let earthTexture: THREE.Texture | null = null
let atmosphere: THREE.Mesh | null = null
let stars: THREE.Points | null = null
let cityPoints: THREE.Group | null = null
let cityLabels: { group: THREE.Group; label: THREE.Sprite }[] = []
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
const createCityPoint = (position: THREE.Vector3, name: string, value: number) => {
  const group = new THREE.Group()

  // 核心点
  const coreGeometry = new THREE.SphereGeometry(0.025, 16, 16)
  const coreMaterial = new THREE.MeshBasicMaterial({ color: 0xffd166 })
  const core = new THREE.Mesh(coreGeometry, coreMaterial)

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
  group.add(core)
  group.add(glow)

  // 创建城市标签
  const label = createCityLabel(name, value)
  label.position.set(0, 0.12, 0)
  group.add(label)

  group.position.copy(position)

  return {
    group,
    label,
  }
}

// 创建城市组
const createCityPoints = () => {
  cityPoints = new THREE.Group()

  cityList.forEach((city) => {
    const position = lonLatToVector3(city.longitude, city.latitude, 1.53)

    const { group, label } = createCityPoint(position, city.name, city.value)

    cityPoints!.add(group)

    cityLabels.push({
      group,
      label,
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

// 射线检测
const checkIntersection = () => {
  if (!camera || !cityPoints) return

  raycaster.setFromCamera(mouse, camera)
  const intersects = raycaster.intersectObjects(cityPoints.children, true)

  if (intersects.length === 0) {
    return
  }

  const object = intersects[0]!.object

  console.log('命中的对象', object)
  console.log('父级对象', object.parent)
}

// 动画
const animate = () => {
  animationId = requestAnimationFrame(animate)

  if (earth) {
    // earth.rotation.y += 0.002
  }

  if (stars) {
    stars.rotation.y += 0.00005
  }

  if (cityPoints) {
    const time = performance.now() * 0.003

    cityPoints.children.forEach((city, index) => {
      const scale = 1 + Math.sin(time + index) * 0.2
      city.scale.setScalar(scale)
    })
  }

  // 更新城市标签
  updateCityLabels()

  // 粒子运动
  const time = performance.now()
  flightParticles.forEach((particle, index) => {
    const curve = flightCurves[index]
    if (!curve) return
    const progress = (time * 0.0002) % 1
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
})

// 在卸载前
onBeforeUnmount(() => {
  cancelAnimationFrame(animationId)

  window.removeEventListener('resize', resize)
  containerRef.value?.removeEventListener('mousemove', handleMouseMove)

  // earth
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
  width: 100%;
  height: 100%;
  flex: 1;
}
</style>
