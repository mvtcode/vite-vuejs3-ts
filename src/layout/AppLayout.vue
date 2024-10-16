<template>
  <el-container class="layout-container">
    <Sidebar :isCollapsed="isCollapsed" />
    <el-container class="main-container" direction="vertical">
      <Topbar @toggle-sidebar="toggleSidebar" />
      <el-main class="bg-slate-100">
        <el-card class="main-card">
          <slot></slot>
        </el-card>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Sidebar from './Sidebar.vue';
import Topbar from './Topbar.vue';

const isCollapsed = ref<boolean>(false);

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
};
</script>

<style scoped>
.layout-container {
  height: 100vh;
}

.main-container {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.el-main {
  padding: 5px;
  overflow-y: auto;
}

.main-card {
  height: 100%;
  overflow-y: auto;
}

:deep(.el-card__body) {
  height: 100%;
  padding: 20px;
}
</style>
