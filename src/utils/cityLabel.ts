import * as THREE from 'three'
import type { CityPoint } from '@/data/earth'

export function createCityLabel(city: CityPoint) {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 80

  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('无法创建 Canvas 2D 上下文')
  }
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.font = 'bold 28px Arial'
  context.fillStyle = '#ffffff'
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.fillText(city.name, canvas.width / 2, 30)

  context.font = '22px Arial'
  context.fillStyle = '#00d9ff'
  context.fillText(city.value.toLocaleString(), canvas.width / 2, 70)

  const texture = new THREE.CanvasTexture(canvas)
  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthWrite: false,
  })
  const sprite = new THREE.Sprite(material)
  sprite.scale.set(0.8, 0.25, 1)

  return sprite
}
