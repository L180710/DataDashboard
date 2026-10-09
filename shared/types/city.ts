export interface City {
  id?: string
  cityId: string
  name: string
  cfg: string
  longitude: number
  latitude: number
  scale: number
  value?: number
}

export interface CityConnection {
  from: string
  to: string
}
