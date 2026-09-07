<template>
  <div ref="containerRef" class="three-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { instance } from 'three/tsl'

const containerRef = ref<HTMLDivElement | null>(null)
let renderer: THREE.WebGLRenderer | null = null
let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null

let earth: THREE.Mesh | null = null
let earthTexture: THREE.Texture | null = null
let atmosphere: THREE.Mesh | null = null
let stars: THREE.Points | null = null

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

  // 生成大气层
  createAtmosphere()

  // 生成星星
  createStars()

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

// 动画
const animate = () => {
  animationId = requestAnimationFrame(animate)

  if (earth) {
    earth.rotation.y += 0.002
  }

  if (stars) {
    stars.rotation.y += 0.00005
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
