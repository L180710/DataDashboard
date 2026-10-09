// 模板数据缩放比例
export const moduleScale = {
  keyData: 1,
  sales: 0.95,
  orders: 1.08,
  users: 1.02,
  channel: 0.9,
}

// 范围内随机浮动
export const randomVariation = (min = 0.95, max = 1.05) => {
  return Math.random() * (max - min) + min
}

/**
模板顺序
核心指标、销售趋势、订单趋势
今日数据、最新订单
用户统计、热门商品、渠道来源
 */

// 核心指标
// 最终值 = baseValue * cityScale * moduleScale * randomVariation
export const keyDataTemplate = [
  { metricId: 'user', title: '用户数量', baseValue: 10000, baseDiff: 4.2 },
  { metricId: 'sale', title: '销售额', baseValue: 800000, baseDiff: 4.3 },
  { metricId: 'order', title: '订单数量', baseValue: 3000, baseDiff: 4 },
  { metricId: 'rate', title: '转化率', baseValue: 35, baseDiff: 3 },
]

// 销售趋势模板
// 最终值 = baseValue * cityScale * moduleScale * randomVariation
export const salesTrendTemplate = [120000, 100000, 160000, 180000, 200000, 230000, 270000]

// 订单趋势模板
// 最终值 = baseValue * cityScale * moduleScale * randomVariation
export const orderTrendTemplate = [500, 600, 550, 700, 800, 900, 850]

// 今日数据模板
// 最终值 = baseValue * cityScale * moduleScale * randomVariation
export const TodayDataTemplate = [
  { metricId: 'userTotal', title: '今日访问量', baseValue: 1000, baseDiff: 2.2 },
  { metricId: 'orderTotal', title: '今日订单数', baseValue: 100, baseDiff: 2.8 },
  { metricId: 'saleTotal', title: '今日销售额', baseValue: 8000, baseDiff: 2.3 },
  { metricId: 'newUserTotal', title: '新增用户数', baseValue: 500, baseDiff: 2.1 },
]

// 最新订单模板
// 订单 ID：BJ+orderId/SH+orderId
export const latestOrdersTemplate = [
  { productName: '智能手机', amount: 1200, status: 0 },
  { productName: '无线蓝牙耳机', amount: 800, status: 1 },
  { productName: '智能手表', amount: 1500, status: 2 },
  { productName: '笔记本电脑', amount: 2000, status: 0 },
  { productName: '机械键盘', amount: 500, status: 1 },
]

export const customerNamePool = [
  '张三',
  '李四',
  '王五',
  '赵六',
  '孙七',
  '周八',
  '吴九',
  '郑十',
  '陈晨',
  '林晓',
  '黄磊',
  '刘洋',
  '杨帆',
  '赵敏',
  '周宁',
  '徐佳',
  '何伟',
  '马超',
  '高远',
  '唐欣',
]

// 用户统计模板
// 最终值 = baseValue * cityScale
export const userStatisticsTemplate = {
  gender: [
    { type: 'male', baseValue: 5600 },
    { type: 'female', baseValue: 4400 },
  ],
  age: [
    { type: '18-24', baseValue: 1800 },
    { type: '25-34', baseValue: 4200 },
    { type: '35-44', baseValue: 2500 },
    { type: '45+', baseValue: 1500 },
  ],
}

// 热门商品模板
// 最终值 = baseValue * cityScale
// 这里有个疑问，如何使得商品名字也自定义化
export const hotProductTemplate = [
  { name: '智能手机', baseAmount: 350000 },
  { name: '笔记本电脑', baseAmount: 280000 },
  { name: '平板电脑', baseAmount: 230000 },
  { name: '智能手表', baseAmount: 180000 },
  { name: '无线耳机', baseAmount: 80000 },
]

// 渠道来源模版
// 最终值 = baseValue * cityScale * moduleScale(channelModuleScale)
export const channelTemplate = [
  { channelId: 'online', name: '线上商城', baseValue: 4200 },
  { channelId: 'offline', name: '线下门店', baseValue: 2800 },
  { channelId: 'thirdParty', name: '第三方平台', baseValue: 1800 },
  { channelId: 'social', name: '社交媒体', baseValue: 1200 },
]
