import { createRouter, createWebHistory } from 'vue-router';
import AppRegister from '../components/AppRegister.vue';
import AppLogin from '../components/AppLogin.vue';
import PostList from '../components/PostList.vue';
import TodoList from '../components/TodoList.vue';
import TodoDetail from '../components/TodoDetail.vue';
import UserDetail from '../components/UserDetail.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/register', component: AppRegister },
  { path: '/login', component: AppLogin },
  { path: '/posts', component: PostList },
  { path: '/todos', component: TodoList },
  { path: '/todos/:id', component: TodoDetail, props: true },
  { path: '/user', component: UserDetail },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const loggedInUserId = localStorage.getItem('loggedInUserId');
  if (to.path !== '/login' && to.path !== '/register' && !loggedInUserId) {
    next('/login');
  } else {
    next();
  }
});

export default router;
