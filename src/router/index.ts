import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/teacher-schedule",
    name: "TeacherSchedule",
    component: () => import("../views/TeacherSchdule.vue"), 
  },
  {
    path: "/",
    name: "Teacher",
    component: () => import("../views/TeacherPage.vue"), 
  },
  // {
  //   path: "/products",
  //   name: "Products",
  //   component: () => import("@/views/Products.vue"),
  // },
  // {
  //   path: "/reports",
  //   name: "Reports",
  //   component: () => import("@/views/Reports.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
