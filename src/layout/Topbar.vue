<template>
  <el-header class="header">
    <div class="header-content">
      <div class="left-section">
        <el-button @click="toggleSidebar" :icon="Fold" />
        <el-breadcrumb separator="/">
          <el-breadcrumb-item
            v-for="item in breadcrumbs"
            :key="item.path"
            :to="{ path: item.path }"
          >
            {{ item.name }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="right-section">
        <el-avatar :size="32" src="https://example.com/avatar.jpg" />
        <span class="username">John Doe</span>
      </div>
    </div>
  </el-header>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  ElButton,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElAvatar,
} from 'element-plus';
import { Fold } from '@element-plus/icons-vue';

const route = useRoute();
// const router = useRouter();

const emit = defineEmits<{
  (e: 'toggle-sidebar'): void;
}>();

const toggleSidebar = () => {
  emit('toggle-sidebar');
};

interface BreadcrumbItem {
  name: string;
  path: string;
}

const breadcrumbs = computed<BreadcrumbItem[]>(() => {
  const { matched } = route;
  return matched.map((item) => ({
    name: (item.meta.title as string) || item.name || 'Unnamed',
    path: item.path,
  }));
});
</script>

<style scoped>
.header {
  background-color: #fff;
  color: #333;
  line-height: 60px;
  border-bottom: 1px solid #dcdfe6;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.left-section {
  display: flex;
  align-items: center;
}

.right-section {
  display: flex;
  align-items: center;
}

.el-button {
  margin-right: 16px;
}

.el-breadcrumb {
  margin-left: 16px;
}

.username {
  margin-left: 8px;
  font-weight: 500;
}

:deep(.el-breadcrumb__inner.is-link) {
  font-weight: normal;
}

:deep(.el-breadcrumb__item:last-child .el-breadcrumb__inner) {
  font-weight: 600;
}
</style>
