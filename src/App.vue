
<template>
  <div id="app">
    <BasicLayout/>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import BasicLayout from "@/layouts/BasicLayout.vue";
import {useLoginUserStore} from "@/stores/useLoginUserStore.ts";


const loginUserStore = useLoginUserStore()
loginUserStore.fetchLoginUser()

// import zhCN from 'ant-design-vue/es/locale/zh_CN';
// import dayjs from 'dayjs';
// import 'dayjs/locale/zh-cn';
// dayjs.locale('zh-cn');

</script>
<style scoped>

</style>
