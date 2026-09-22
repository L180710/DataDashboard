import type { DataUIItem } from '@/types/dataList'

export const keyUIList: Record<string, DataUIItem> = {
  user: {
    icon: 'zongyonghushu',
    color: '#6fadea',
  },
  order: {
    icon: 'dingdanshu',
    color: '#725bce',
  },
  sale: {
    icon: 'xiaoshouguanli',
    color: '#d6aa59',
  },
  rate: {
    icon: 'zhuanhuashuai',
    color: '#89d1b5',
  },
}

export const todayUIList: Record<string, DataUIItem> = {
  userTotal: {
    icon: 'fangketou',
    color: '#6fadea',
  },
  orderTotal: {
    icon: 'dingdanshuju',
    color: '#d19a56',
  },
  saleTotal: {
    icon: 'xiaoshouliang',
    color: '#dfc181',
  },
  newUserTotal: {
    icon: 'cengci',
    color: '#73b4d7',
  },
}
