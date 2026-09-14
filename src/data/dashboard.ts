import type { DashboardData } from '@/types/dashboard'

export const dashboardData: DashboardData[] = [
  // ==================== 全国 ====================
  {
    cityId: 'national',
    keyData: [
      {
        id: '1',
        icon: 'zongyonghushu',
        title: '用户总数',
        account: 128681,
        diff: 3,
        status: 1,
        color: '#6fadea',
      },
      {
        id: '2',
        icon: 'dingdanshu',
        title: '总订单数',
        account: 128999,
        diff: 2.3,
        status: 1,
        color: '#725bce',
      },
      {
        id: '3',
        icon: 'xiaoshouguanli',
        title: '总销售额',
        account: 8999,
        diff: 1,
        status: 0,
        color: '#d6aa59',
      },
      {
        id: '4',
        icon: 'zhuanhuashuai',
        title: '转化率',
        account: 35.6,
        diff: 3.2,
        status: 1,
        color: '#89d1b5',
      },
    ],
    salesTrend: null,
    orderTrend: null,
    todayData: [
      {
        id: '1',
        icon: 'fangketou',
        title: '今日访问量',
        account: 1726,
        diff: 3,
        status: 1,
        color: '#6fadea',
      },
      {
        id: '2',
        icon: 'dingdanshuju',
        title: '今日订单数',
        account: 126,
        diff: 2.3,
        status: 1,
        color: '#d19a56',
      },
      {
        id: '3',
        icon: 'xiaoshouliang',
        title: '今日销售额',
        account: 8999,
        diff: 1,
        status: 0,
        color: '#dfc181',
      },
      {
        id: '4',
        icon: 'cengci',
        title: '新增用户数',
        account: 89,
        diff: 3.2,
        status: 1,
        color: '#73b4d7',
      },
    ],
    latestOrders: [
      {
        id: '1',
        orderNum: 'ORD20260901',
        userName: '张三',
        productName: '高性能机械键盘',
        price: 399.0,
        time: '2026-09-01',
        state: 0,
      },
      {
        id: '2',
        orderNum: 'ORD20260902',
        userName: '李四',
        productName: '无线降噪耳机',
        price: 899.0,
        time: '2026-09-02',
        state: 1,
      },
      {
        id: '3',
        orderNum: 'ORD20260903',
        userName: '王五',
        productName: '27英寸4K显示器',
        price: 2199.0,
        time: '2026-09-03',
        state: 2,
      },
      {
        id: '4',
        orderNum: 'ORD20260904',
        userName: '赵六',
        productName: '人体工学办公椅',
        price: 1580.0,
        time: '2026-09-04',
        state: 1,
      },
      {
        id: '5',
        orderNum: 'ORD20260905',
        userName: '孙七',
        productName: '智能手表Pro Max',
        price: 2599.0,
        time: '2026-09-05',
        state: 0,
      },
    ],
    userStatistics: null,
    hotProductData: [
      { id: '1', order: 1, productName: '智能手机', price: 125680, ratio: 100 },
      { id: '2', order: 2, productName: '笔记本电脑', price: 98765, ratio: 86.88 },
      { id: '3', order: 3, productName: '无线耳机', price: 76543, ratio: 67.8 },
      { id: '4', order: 4, productName: '智能手表', price: 56321, ratio: 54.0 },
      { id: '5', order: 5, productName: '平板电脑', price: 45678, ratio: 33.8 },
    ],
    channelStatistics: null,
  },

  // ==================== 北京 ====================
  {
    cityId: 'beijing',
    keyData: [
      {
        id: '1',
        icon: 'zongyonghushu',
        title: '用户总数',
        account: 86342, // ✅ 从 128681 改小
        diff: 4.5, // ✅ 从 3 改
        status: 1,
        color: '#6fadea',
      },
      {
        id: '2',
        icon: 'dingdanshu',
        title: '总订单数',
        account: 75218, // ✅ 从 128999 改小
        diff: 1.8, // ✅ 从 2.3 改
        status: 1,
        color: '#725bce',
      },
      {
        id: '3',
        icon: 'xiaoshouguanli',
        title: '总销售额',
        account: 5623, // ✅ 从 8999 改小
        diff: 2.4, // ✅ 从 1 改
        status: 0,
        color: '#d6aa59',
      },
      {
        id: '4',
        icon: 'zhuanhuashuai',
        title: '转化率',
        account: 28.4, // ✅ 从 35.6 改小
        diff: -1.2, // ✅ 从 3.2 改为负数
        status: 0,
        color: '#89d1b5',
      },
    ],
    salesTrend: null,
    orderTrend: null,
    todayData: [
      {
        id: '1',
        icon: 'fangketou',
        title: '今日访问量',
        account: 1284, // ✅ 从 1726 改小
        diff: 5.2, // ✅ 从 3 改
        status: 1,
        color: '#6fadea',
      },
      {
        id: '2',
        icon: 'dingdanshuju',
        title: '今日订单数',
        account: 98, // ✅ 从 126 改小
        diff: -0.8, // ✅ 从 2.3 改为负数
        status: 0,
        color: '#d19a56',
      },
      {
        id: '3',
        icon: 'xiaoshouliang',
        title: '今日销售额',
        account: 6234, // ✅ 从 8999 改小
        diff: 3.6, // ✅ 从 1 改
        status: 1,
        color: '#dfc181',
      },
      {
        id: '4',
        icon: 'cengci',
        title: '新增用户数',
        account: 56, // ✅ 从 89 改小
        diff: -2.1, // ✅ 从 3.2 改为负数
        status: 0,
        color: '#73b4d7',
      },
    ],
    latestOrders: [
      {
        id: '1',
        orderNum: 'ORD20260906',
        userName: '周明', // ✅ 换名字
        productName: '高性能机械键盘',
        price: 459.0, // ✅ 从 399 改
        time: '2026-09-06', // ✅ 换日期
        state: 0,
      },
      {
        id: '2',
        orderNum: 'ORD20260907',
        userName: '吴静', // ✅ 换名字
        productName: '无线降噪耳机',
        price: 799.0, // ✅ 从 899 改
        time: '2026-09-07',
        state: 2, // ✅ 换状态
      },
      {
        id: '3',
        orderNum: 'ORD20260908',
        userName: '郑磊', // ✅ 换名字
        productName: '27英寸4K显示器',
        price: 1899.0, // ✅ 从 2199 改
        time: '2026-09-08',
        state: 1,
      },
      {
        id: '4',
        orderNum: 'ORD20260909',
        userName: '陈雪', // ✅ 换名字
        productName: '人体工学办公椅',
        price: 1280.0, // ✅ 从 1580 改
        time: '2026-09-09',
        state: 0, // ✅ 换状态
      },
      {
        id: '5',
        orderNum: 'ORD20260910',
        userName: '林涛', // ✅ 换名字
        productName: '智能手表Pro Max',
        price: 2999.0, // ✅ 从 2599 改
        time: '2026-09-10',
        state: 1,
      },
    ],
    userStatistics: null,
    hotProductData: [
      { id: '1', order: 1, productName: '智能手机', price: 98650, ratio: 100 }, // ✅ price 改
      { id: '2', order: 2, productName: '笔记本电脑', price: 76540, ratio: 92.4 }, // ✅ price 改
      { id: '3', order: 3, productName: '无线耳机', price: 54320, ratio: 71.5 }, // ✅ 都改
      { id: '4', order: 4, productName: '智能手表', price: 43210, ratio: 48.2 }, // ✅ 都改
      { id: '5', order: 5, productName: '平板电脑', price: 32150, ratio: 26.7 }, // ✅ 都改
    ],
    channelStatistics: null,
  },

  // ==================== 深圳 ====================
  {
    cityId: 'shenzhen',
    keyData: [
      {
        id: '1',
        icon: 'zongyonghushu',
        title: '用户总数',
        account: 97654, // ✅ 与全国、北京都不同
        diff: -2.1, // ✅ 负数，表示下降
        status: 0,
        color: '#6fadea',
      },
      {
        id: '2',
        icon: 'dingdanshu',
        title: '总订单数',
        account: 88342, // ✅ 与前面都不同
        diff: 5.6, // ✅ 与前面都不同
        status: 1,
        color: '#725bce',
      },
      {
        id: '3',
        icon: 'xiaoshouguanli',
        title: '总销售额',
        account: 7245, // ✅ 与前面都不同
        diff: 4.8, // ✅ 与前面都不同
        status: 1,
        color: '#d6aa59',
      },
      {
        id: '4',
        icon: 'zhuanhuashuai',
        title: '转化率',
        account: 42.8, // ✅ 与前面都不同
        diff: 2.6, // ✅ 与前面都不同
        status: 1,
        color: '#89d1b5',
      },
    ],
    salesTrend: null,
    orderTrend: null,
    todayData: [
      {
        id: '1',
        icon: 'fangketou',
        title: '今日访问量',
        account: 2158, // ✅ 最大
        diff: -3.4, // ✅ 负数
        status: 0,
        color: '#6fadea',
      },
      {
        id: '2',
        icon: 'dingdanshuju',
        title: '今日订单数',
        account: 168, // ✅ 最大
        diff: 4.2, // ✅ 不同
        status: 1,
        color: '#d19a56',
      },
      {
        id: '3',
        icon: 'xiaoshouliang',
        title: '今日销售额',
        account: 10236, // ✅ 最大
        diff: -1.5, // ✅ 负数
        status: 0,
        color: '#dfc181',
      },
      {
        id: '4',
        icon: 'cengci',
        title: '新增用户数',
        account: 134, // ✅ 最大
        diff: 6.8, // ✅ 不同
        status: 1,
        color: '#73b4d7',
      },
    ],
    latestOrders: [
      {
        id: '1',
        orderNum: 'ORD20260911', // ✅ 换单号
        userName: '黄伟', // ✅ 换名字
        productName: '高性能机械键盘',
        price: 529.0, // ✅ 不同
        time: '2026-09-11', // ✅ 换日期
        state: 1,
      },
      {
        id: '2',
        orderNum: 'ORD20260912',
        userName: '许婷', // ✅ 换名字
        productName: '无线降噪耳机',
        price: 1099.0, // ✅ 不同
        time: '2026-09-12',
        state: 0, // ✅ 换状态
      },
      {
        id: '3',
        orderNum: 'ORD20260913',
        userName: '何强', // ✅ 换名字
        productName: '27英寸4K显示器',
        price: 2599.0, // ✅ 不同
        time: '2026-09-13',
        state: 2,
      },
      {
        id: '4',
        orderNum: 'ORD20260914',
        userName: '罗敏', // ✅ 换名字
        productName: '人体工学办公椅',
        price: 1880.0, // ✅ 不同
        time: '2026-09-14',
        state: 1,
      },
      {
        id: '5',
        orderNum: 'ORD20260915',
        userName: '宋佳', // ✅ 换名字
        productName: '智能手表Pro Max',
        price: 3299.0, // ✅ 不同
        time: '2026-09-15',
        state: 0,
      },
    ],
    userStatistics: null,
    hotProductData: [
      { id: '1', order: 1, productName: '智能手机', price: 145230, ratio: 100 }, // ✅ 最大
      { id: '2', order: 2, productName: '笔记本电脑', price: 112340, ratio: 78.6 }, // ✅ 不同
      { id: '3', order: 3, productName: '无线耳机', price: 87650, ratio: 59.2 }, // ✅ 不同
      { id: '4', order: 4, productName: '智能手表', price: 65430, ratio: 41.3 }, // ✅ 不同
      { id: '5', order: 5, productName: '平板电脑', price: 52310, ratio: 28.9 }, // ✅ 不同
    ],
    channelStatistics: null,
  },
]
