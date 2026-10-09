import type { DataItem } from '../../../shared/types/dashboard'
import type { DataListItem } from '@/types/dataList'
import { keyUIList, todayUIList } from '@/data/dataUIList'

// 核心指标、今日数据合并类型
export const createDataList = (list: DataItem[], typeStr: string): DataListItem[] => {
  return list.map((item) => {
    const lst = typeStr === 'key' ? keyUIList : todayUIList
    const uiItem = lst[item.metricId]!
    return {
      ...item,
      icon: uiItem.icon,
      color: uiItem.color,
    }
  })
}
