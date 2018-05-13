// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
  {
    name: '首页',
    path: '/',
    icon: 'home',
  },
  {
    name: '网站',
    path: 'http://39.107.125.244/dist/',
    external: true,
    newWindow: true,
    icon: 'link',
  },
  {
    name: '帮助',
    path: 'https://alibaba.github.io/ice',
    external: true,
    newWindow: true,
    icon: 'bangzhu',
  },
];

const asideMenuConfig = [
  {
    name: '首页',
    path: '/',
    icon: 'home',
  },
  {
    name: '列表管理',
    path: '/productPage',
    icon: 'publish',
  },
];

export { headerMenuConfig, asideMenuConfig };
