import type { IconName } from './icon'

// 核心指标
export interface KeyDataItem {
  id: string
  icon: IconName
  title: string
  account: number
  diff: number
  status: 0 | 1 // 0 降低，1 上升
  color: string
}

export type KeyDataList = KeyDataItem[]
