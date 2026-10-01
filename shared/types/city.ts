export interface City {
  id: string
  cityId: string
  name: string
  longitude: number
  latitude: number
  value: number
  createdAt: string
  updatedAt: string
}

export interface CityConnection {
  from: string
  to: string
}
