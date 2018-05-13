// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import HeaderAsideFooterLayout from './layouts/HeaderAsideFooterLayout';
import Home from './pages/Home';

import HeaderAsideFooterResponsiveLayout from './layouts/HeaderAsideFooterResponsiveLayout';
import ProductPage from './pages/ProductPage';

import PageEdit from './pages/PageEdit';
import NotFound from './pages/NotFound';

const routerConfig = [
  {
    path: '/',
    layout: HeaderAsideFooterLayout,
    component: Home,
  },
  {
    path: '/productPage',
    layout: HeaderAsideFooterResponsiveLayout,
    component: ProductPage,
  },
  {
    path: '/pageEdit',
    layout: HeaderAsideFooterResponsiveLayout,
    component: PageEdit,
  },
  {
    path: '*',
    layout: HeaderAsideFooterLayout,
    component: NotFound,
  },
];

export default routerConfig;
