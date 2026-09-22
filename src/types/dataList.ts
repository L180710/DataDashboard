// 这个是 dataList 的类型声明，主要用于“核心指标”，“今日数据”
import type { DataItem } from '../../shared/types/dashboard.ts'
import type { IconName } from '@/types/icon'

export interface DataUIItem {
  icon: IconName
  color: string
}

export interface DataListItem extends DataItem, DataUIItem {}
