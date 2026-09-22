export interface City {
  id: string
  name: string
  longitude: number
  latitude: number
  value: number
}

export interface CityConnection {
  from: string
  to: string
}
