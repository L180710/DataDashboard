import * as THREE from 'three'

export function createFlightLine(start: THREE.Vector3, end: THREE.Vector3) {
  // 计算两点之间的大致方向
  const middle = start.clone().add(end).normalize()
  // 把控制点推离地球表面
  const control = middle.multiplyScalar(1.7)
  // 创建三维贝塞尔曲线
  const curve = new THREE.QuadraticBezierCurve3(start, control, end)
  // 获取曲线上的点
  const points = curve.getPoints(50)
  //  创建 geometry
  const geometry = new THREE.BufferGeometry().setFromPoints(points)
  // 创建 material
  const material = new THREE.LineBasicMaterial({
    color: 0x00d9ff,
    transparent: true,
    opacity: 0.7,
    depthWrite: false,
  })
  // 创建 line
  const line = new THREE.Line(geometry, material)

  return { line, curve }
}
