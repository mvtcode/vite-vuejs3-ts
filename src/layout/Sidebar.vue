<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  Document,
  Menu as IconMenu,
  Setting,
  User,
  Files,
  Guide,
  Folder,
  Edit,
} from '@element-plus/icons-vue';

interface MenuItem {
  index: string;
  title: string;
  icon?: any;
  children?: MenuItem[];
}
interface Props {
  isCollapsed: boolean;
}
const route = useRoute();
const router = useRouter();

const props = withDefaults(defineProps<Props>(), {
  isCollapsed: false,
});

const menuItems: MenuItem[] = [
  {
    index: '/dashboard',
    title: 'Dashboard',
    icon: IconMenu,
    children: [
      { index: '/dashboard/overview', title: 'Overview', icon: Document },
      { index: '/dashboard/analytics', title: 'Analytics', icon: Document },
    ],
  },
  {
    index: '/documents',
    title: 'Documents',
    icon: Document,
    children: [
      { index: '/documents/all', title: 'All Documents', icon: Files },
      {
        index: '/documents/categories',
        title: 'Categories',
        icon: Folder,
        children: [
          { index: '/documents/categories/work', title: 'Work', icon: Folder },
          {
            index: '/documents/categories/personal',
            title: 'Personal',
            icon: Folder,
          },
          {
            index: '/documents/categories/projects',
            title: 'Projects',
            icon: Folder,
            children: [
              {
                index: '/documents/categories/projects/active',
                title: 'Active',
                icon: Edit,
              },
              {
                index: '/documents/categories/projects/archived',
                title: 'Archived',
                icon: Files,
              },
            ],
          },
        ],
      },
      { index: '/documents/create', title: 'Create New', icon: Document },
    ],
  },
  {
    index: '/users',
    title: 'Users',
    icon: User,
    children: [
      { index: '/users/list', title: 'User List', icon: User },
      { index: '/users/groups', title: 'User Groups', icon: User },
    ],
  },
  {
    index: '/reports',
    title: 'Reports',
    icon: Files,
    children: [
      { index: '/reports/generate', title: 'Generate Report', icon: Files },
      { index: '/reports/view', title: 'View Reports', icon: Files },
    ],
  },
  {
    index: '/help',
    title: 'Help & Support',
    icon: Guide,
    children: [
      { index: '/help/faq', title: 'FAQs', icon: Document },
      { index: '/help/contact', title: 'Contact Support', icon: User },
    ],
  },
  { index: '/settings', title: 'Settings', icon: Setting },
];

const activeIndex = computed(() => route.path);

const handleSelect = (index: string) => {
  router.push(index);
};
</script>

<template>
  <el-aside :width="props.isCollapsed ? '64px' : '220px'" class="sidebar">
    <div class="logo-container">
      <!-- <img src="/path-to-your-logo.png" alt="Logo" class="logo" /> -->
    </div>
    <el-scrollbar>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-vertical"
        :collapse="props.isCollapsed"
        @select="handleSelect"
      >
        <template v-for="item in menuItems" :key="item.index">
          <el-sub-menu v-if="item.children" :index="item.index">
            <template #title>
              <el-icon><component :is="item.icon" /></el-icon>
              <span>{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.children" :key="subItem.index">
              <el-sub-menu v-if="subItem.children" :index="subItem.index">
                <template #title>
                  <el-icon><component :is="subItem.icon" /></el-icon>
                  <span>{{ subItem.title }}</span>
                </template>
                <el-menu-item
                  v-for="grandChild in subItem.children"
                  :key="grandChild.index"
                  :index="grandChild.index"
                >
                  <el-icon><component :is="grandChild.icon" /></el-icon>
                  <span>{{ grandChild.title }}</span>
                </el-menu-item>
              </el-sub-menu>
              <el-menu-item v-else :index="subItem.index">
                <el-icon><component :is="subItem.icon" /></el-icon>
                <span>{{ subItem.title }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
          <el-menu-item v-else :index="item.index">
            <el-icon><component :is="item.icon" /></el-icon>
            <span>{{ item.title }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<style scoped>
.sidebar {
  height: 100vh;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  transition: width 0.3s;
  display: flex;
  flex-direction: column;
}

.logo-container {
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: #f0f2f5;
}

.logo {
  max-height: 40px;
  max-width: 100%;
}

.el-scrollbar {
  flex-grow: 1;
  height: calc(100vh - 60px); /* Subtract logo container height */
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 220px;
}

/* Override Element Plus styles for white background */
:deep(.el-menu) {
  border-right: none;
}

:deep(.el-menu-item),
:deep(.el-sub-menu__title) {
  color: #303133;
}

:deep(.el-menu-item:hover),
:deep(.el-menu-item:focus),
:deep(.el-sub-menu__title:hover) {
  background-color: #ecf5ff;
}

:deep(.el-menu-item.is-active) {
  color: #409eff;
  background-color: #ecf5ff;
}

/* Custom scrollbar styles */
:deep(.el-scrollbar__bar) {
  z-index: 4;
}

:deep(.el-scrollbar__wrap) {
  overflow-x: hidden;
}
</style>
