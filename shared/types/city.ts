export interface City {
  id?: number
  cityId: string
  name: string
  cfg: string
  longitude: number
  latitude: number
  scale: number
  value: number
}

export interface CityConnection {
  from: City
  to: City
}
