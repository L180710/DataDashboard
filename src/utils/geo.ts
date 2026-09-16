import * as THREE from 'three'

// 将经纬度转换成球面坐标
export function lonLatToVector3(
  longtitude: number,
  latitude: number,
  radius: number,
): THREE.Vector3 {
  const phi = THREE.MathUtils.degToRad(90 - latitude)
  const theta = THREE.MathUtils.degToRad(longtitude)
  const x = radius * Math.sin(phi) * Math.cos(theta)
  const y = radius * Math.cos(phi)
  const z = radius * Math.sin(phi) * Math.sin(theta)

  return new THREE.Vector3(x, y, z)
}
