import { createRouter, createWebHistory } from 'vue-router'
import HomePage from "@/pages/HomePage.vue";
import UserLoginPage from "@/pages/user/UserLoginPage.vue";
import UserRegisterPage from "@/pages/user/UserRegisterPage.vue";
import UserManagePage from "@/pages/admin/UserManagePage.vue";
import PersonalCenterPage from "@/pages/user/PersonalCenterPage.vue";
import AddPicturePage from "@/pages/AddPicturePage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '主页',
      component: HomePage,
    },
    {
      path: '/user/login',
      name: '用户登录',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: UserLoginPage,
    },
    {
      path: '/user/register',
      name: '用户注册',
      component: UserRegisterPage
    },
    {
      path:'/admin/userManage',
      name:'用户管理',
      component: UserManagePage,
    },
    {
      path:'/user/personalCenter',
      name:'个人中心',
      component: PersonalCenterPage,
    },
    {
      path:'/add_picture/',
      name:'创建图片',
      component: AddPicturePage,
    }
  ],
})

export default router
