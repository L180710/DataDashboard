import * as THREE from 'three'
import { lonLatToVector3 } from './geo'

// 根据一个 Polygen 创建球面填充
function createPolygonMesh(coordinates: [number, number][][], radius: number): THREE.Mesh | null {
  const outerRing = coordinates[0]

  if (!outerRing || outerRing.length < 3) {
    return null
  }

  // 外轮廓
  const shape = new THREE.Shape()

  outerRing.forEach(([longitude, latitude], index) => {
    if (index === 0) {
      shape.moveTo(longitude, latitude)
    } else {
      shape.lineTo(longitude, latitude)
    }
  })

  // GeoJSON 中除了第一个 ring 以外，后面的 ring 表示洞
  const holes = coordinates.slice(1)

  holes.forEach((hole) => {
    if (hole.length < 3) return

    const path = new THREE.Path()

    hole.forEach(([longitude, latitude], index) => {
      if (index === 0) {
        path.moveTo(longitude, latitude)
      } else {
        path.lineTo(longitude, latitude)
      }
    })

    shape.holes.push(path)
  })

  // 利用 Three.js 对多边形进行三角剖分
  const geometry = new THREE.ShapeGeometry(shape)
  const position = geometry.getAttribute('position')

  /**
   * ShapeGeometry 此时还是平面坐标
   * x = Longitude
   * y = Latitude
   *
   * 把它转换成球面坐标
   */
  for (let i = 0; i < position.count; i++) {
    const longtitude = position.getX(i)
    const latitude = position.getY(i)

    const point = lonLatToVector3(longtitude, latitude, radius)
    position.setXYZ(i, point.x, point.y, point.z)
  }

  position.needsUpdate = true
  geometry.computeVertexNormals()

  const material = new THREE.MeshBasicMaterial({
    color: 0x168cff,
    transparent: true,
    opacity: 0.18,

    // 地球表面上的地图可以从背面看到
    side: THREE.DoubleSide,

    // 防止透明地图产生奇怪的深度遮挡
    depthWrite: false,
  })

  return new THREE.Mesh(geometry, material)
}

// 一个行政区可能包含多个彼此分离的区域
function createFeatureMesh(feature: any, radius: number): THREE.Mesh[] {
  const meshes: THREE.Mesh[] = []

  const geometryType = feature.geometry?.type
  const coordinates = feature.geometry?.coordinates

  if (!coordinates) {
    return meshes
  }

  if (geometryType === 'Polygon') {
    const mesh = createPolygonMesh(coordinates, radius)

    if (mesh) {
      meshes.push(mesh)
    }
  }

  if (geometryType === 'MultiPolygon') {
    coordinates.forEach((polygon: [number, number][][]) => {
      const mesh = createPolygonMesh(polygon, radius)

      if (mesh) {
        meshes.push(mesh)
      }
    })
  }

  return meshes
}

//创建整个中国地图
export function createChinaFills(geojson: any, radius: number): THREE.Group {
  const group = new THREE.Group()

  if (geojson.type !== 'FeatureCollection') {
    return group
  }

  geojson.features.forEach((feature: any) => {
    const meshes = createFeatureMesh(feature, radius)

    meshes.forEach((mesh) => {
      group.add(mesh)
    })
  })

  return group
}
