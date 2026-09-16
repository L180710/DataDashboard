import * as THREE from 'three'
import { lonLatToVector3 } from './geo'

export interface GeoJSONFeature {
  type: 'Feature'
  properties: Record<string, unknown>
  geometry: {
    type: 'Polygon' | 'MultiPolygon'
    coordinates: unknown
  }
}

export interface GeoJSONFeaturesCollection {
  type: 'FeatureCollection'
  features: GeoJSONFeature[]
}

const GEOJSON_RADIUS = 1.51

// 把地图上的经纬度点，转换成 3D 球面上的位置
export const geoJsonCoordinatesToVector3 = (coordinates: [number, number][]): THREE.Vector3[] => {
  return coordinates.map(([longitude, latitude]) => {
    return lonLatToVector3(longitude, latitude, GEOJSON_RADIUS)
  })
}

// 创建省界 Line
export const createGeoJsonLine = (coordinates: [number, number][]): THREE.Line => {
  const points = geoJsonCoordinatesToVector3(coordinates)

  const geometry = new THREE.BufferGeometry().setFromPoints(points)
  const material = new THREE.LineBasicMaterial({
    color: 0x00d9ff,
    transparent: true,
    opacity: 0.8,
  })

  return new THREE.Line(geometry, material)
}

// 从 GeoJSON 中找到坐标
export const createGeoJsonFeature = (feature: GeoJSONFeature): THREE.Group => {
  const group = new THREE.Group()

  const geometry = feature.geometry

  if (geometry.type === 'Polygon') {
    const coordinates = geometry.coordinates as [number, number][][]
    coordinates.forEach((ring) => {
      const line = createGeoJsonLine(ring)
      group.add(line)
    })
  }

  return group
}
