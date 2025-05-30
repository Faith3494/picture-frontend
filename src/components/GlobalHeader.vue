<template>
  <a-row :wrap="false">
    <a-col flex="200px">
      <RouterLink to="/">
        <div class="title-bar">
          <img class="logo" src="../assets/logo.png" alt="logo" />
          <div class="title">云图库</div>
        </div>
      </RouterLink>
    </a-col>
    <a-col flex="auto">
      <a-menu
        v-model:selectedKeys="current"
        mode="horizontal"
        :items="items"
        @click="doMenuClick"
      />
    </a-col>
    <a-col flex="120px">
      <div v-if="loginUserStore.loginUser.id">
        <a-dropdown>
          <ASpace>
            <a-avatar :src="loginUserStore.loginUser.userAvatar" />
            {{ loginUserStore.loginUser.userName ?? '无名' }}
          </ASpace>
          <template #overlay>
            <a-menu>
              <a-menu-item @click="doLogout">
                <LogoutOutlined />
                退出登录
              </a-menu-item>
              <a-menu-item @click="personalCenter">
                <UserOutlined />
                个人中心
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
      <div v-else>
        <a-button type="primary" href="/user/login">登录</a-button>
      </div>
    </a-col>
  </a-row>
</template>
<script lang="ts" setup>
import {computed, h, ref} from 'vue'
import { HomeOutlined,LogoutOutlined,BarsOutlined,UserOutlined,PictureOutlined} from '@ant-design/icons-vue'
import {MenuProps, message} from 'ant-design-vue'
import { useRouter } from 'vue-router'
import {useLoginUserStore} from "@/stores/useLoginUserStore.ts";
import {userLogoutUsingPost} from "@/api/userController.ts";

const current = ref<string[]>(['home'])
const router = useRouter()

const loginUserStore = useLoginUserStore()
// 路由跳转
const doMenuClick = ({ key }) => {
  router.push({
    path: key,
  })
}
// 当前选中菜单
// 监听路由变化，更新当前选中菜单
router.afterEach((to, from, next) => {
  current.value = [to.path];
});

const doLogout = async () =>{
  const res = await userLogoutUsingPost()
  if (res.data.code === 0){
    loginUserStore.setLoginUser({
      userName:"未登录"
    })
    message.success("退出登录成功")
    await router.push('/user/login')
  }else{
    message.error("退出登录失败 "+res.data.message)
  }
}

const personalCenter = async ()=>{
  await router.push('/user/personalCenter')
}

// 菜单列表
const originItems = [
  {
    key: '/',
    icon: () => h(HomeOutlined),
    label: '主页',
    title: '主页',
  },
  {
    key: '/admin/userManage',
    icon: ()=> h(BarsOutlined),
    label: '用户管理',
    title: '用户管理',

  },{
    key: '/add_picture',
    icon: ()=> h(PictureOutlined),
    label: '创建图片',
    title: '创建图片',

  }
]



// 过滤菜单项
const filterMenus = (menus = [] as MenuProps['items']) => {
  return menus?.filter((menu) => {
    if (menu.key.startsWith('/admin')) {
      const loginUser = loginUserStore.loginUser
      if (!loginUser || loginUser.userRole !== "admin") {
        return false
      }
    }
    return true
  })
}

// 展示在菜单的路由数组
const items = computed<MenuProps['items']>(() => filterMenus(originItems))

</script>

<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.title {
  color: black;
  font-size: 18px;
  margin-left: 16px;
}

.logo {
  height: 48px;
}
</style>
