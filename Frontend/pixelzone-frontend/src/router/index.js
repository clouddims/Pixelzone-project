import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Auth/Login.vue';
import Register from '../views/Auth/Register.vue';
import Dashboard from '../views/Dashboard.vue';
import CategoriesIndex from '../views/categories/Index.vue';
import ProdukIndex from '../views/produk/index.vue';
import CreateCategory from '../views/categories/CreateCategory.vue';
import EditCategory from '../views/categories/editcategory.vue';
import CreateProduk from '../views/produk/create.vue';
import EditProduk from '../views/produk/Edit.vue';
import Checkout from '../views/Checkout.vue';
import PaymentSuccess from '../views/PaymentSuccess.vue';
import api from '../axios';

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/login', component: Login, meta: { guest: true } },
  { path: '/register', component: Register, meta: { guest: true } },
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/categories', component: CategoriesIndex, meta: { requiresAuth: true } },
  { path: '/products', component: ProdukIndex, meta: { requiresAuth: true } },
  { path: '/create-category', component: CreateCategory, meta: { requiresAuth: true } },
  { path: '/edit-category/:id', component: EditCategory, meta: { requiresAuth: true } },
  { path: '/create-product', component: CreateProduk, meta: { requiresAuth: true } },
  { path: '/edit-product/:id', component: EditProduk, meta: { requiresAuth: true } },
  { path: '/checkout', component: Checkout, meta: { requiresAuth: true } },
  { path: '/payment-success', component: PaymentSuccess, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

async function checkAuth() {
  try {
    await api.get('/user');
    return true;
  } catch (error) {
    return false;
  }
}

router.beforeEach(async (to, from, next) => {
  const isAuthenticated = await checkAuth();

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else if (to.meta.guest && isAuthenticated) {
    next('/dashboard');
  } else {
    next();
  }
});

export default router;
