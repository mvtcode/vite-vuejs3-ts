import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
// import Dashboard from '../views/dashboard/Index.vue';
// import NotFound from '../views/404.vue';
// import Forbidden from '../views/403.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/LoginPage.vue'),
    meta: {
      requiresAuth: false,
      title: 'Đăng nhập',
      permission: '',
    },
  },
  {
    path: '/403',
    name: 'Forbidden',
    component: () => import('@/views/403.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/404.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Giả lập kiểm tra quyền truy cập
const hasAccess = () => {
  // Thực tế, bạn sẽ kiểm tra quyền truy cập dựa trên logic của ứng dụng
  return true;
};

router.beforeEach((to, _from, next) => {
  if (to.meta.requiresAuth && !hasAccess()) {
    next({ name: 'Forbidden' });
  } else {
    next();
  }
});

export default router;
