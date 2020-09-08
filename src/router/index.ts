import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Tabs from "../views/Tabs.vue";


const routes: Array<RouteRecordRaw> = [
  {
    path: "",
    redirect: '/tabs/list'
  },
  {
    path: "/image-detail/:url",
    component: () => import("@/views/ImageDetail.vue"),
  },
  {
    path: "/tabs/",
    component: Tabs,
    children: [
      {
        path: "",
        redirect: "list",
      },
      {
        path: "upload",
        component: () => import("@/views/Home.vue"),
      },
      {
        path: "list",
        component: () => import("@/views/AllUploads.vue"),
      },
      {
        path: "geolocation",
        component: () => import("@/views/Geolocation.vue"),
      },
    ],
  }
];


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
