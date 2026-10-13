import type { DataItem } from '../../shared/types/dashboard.ts'
import type { IconName } from './icon.ts'

export interface DataUIItem {
  icon: IconName
  color: string
}

export interface DataListItem extends DataItem, DataUIItem {}
