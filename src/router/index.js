import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import HowToUse from '@/views/HowToUse.vue';
import UploadPage from '@/views/UploadPage.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/how-to-use',
    name: 'how-to-use',
    component: HowToUse,
  },
  {
    path: '/upload',
    name: 'upload',
    component: UploadPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
