<template>
  <el-header class="header">
    <div class="header-content">
      <div class="left-section">
        <el-button @click="toggleSidebar" :icon="isCollapsed ? Expand : Fold" />
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
        <div class="mr-4">
          <el-popover
            placement="bottom-end"
            :width="300"
            trigger="click"
            title="file download"
            popper-class="notification-popover"
          >
            <template #reference>
              <el-button size="default" class="!mr-0" :icon="Download" circle />
            </template>
            <ul class="notification-list">
              <li v-for="notification in notifications" :key="notification.id">
                {{ notification.content }}
              </li>
            </ul>
          </el-popover>
        </div>
        <el-popover
          placement="bottom-end"
          :width="300"
          trigger="click"
          popper-class="notification-popover"
        >
          <template #reference>
            <el-badge :value="200" :max="99" class="notification-badge">
              <el-button size="default" class="!mr-0" :icon="Bell" circle />
            </el-badge>
          </template>
          <el-tabs>
            <el-tab-pane label="Thông báo">
              <ul class="notification-list">
                <li
                  v-for="notification in notifications"
                  :key="notification.id"
                >
                  {{ notification.content }}
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="Tin tức hệ thống">
              <ul class="notification-list">
                <li v-for="news in systemNews" :key="news.id">
                  {{ news.content }}
                </li>
              </ul>
            </el-tab-pane>
          </el-tabs>
        </el-popover>
        <div class="ml-8">
          <el-popover
            placement="bottom-end"
            :width="280"
            trigger="click"
            popper-class="account-popover"
          >
            <template #reference>
              <div class="account-info">
                <el-avatar :size="32" :src="userAvatar" :icon="User" />
                <span class="username">John Doe</span>
                <el-icon class="arrow-icon"><ArrowDown /></el-icon>
              </div>
            </template>
            <div class="account-details">
              <div class="user-header text-center">
                <el-avatar :size="60" :src="userAvatar" :icon="User" />
                <div class="user-info">
                  <h3>John Doe</h3>
                  <p>john.doe@example.com</p>
                </div>
              </div>
              <el-divider />
              <div class="flex flex-col gap-2">
                <!-- <el-button size="default" @click="viewProfile">
                  <el-icon class="mr-2"><User /></el-icon>
                  Xem hồ sơ
                </el-button> -->
                <el-button
                  size="default"
                  class="w-full"
                  @click="changePassword"
                >
                  <el-icon class="mr-2"><Lock /></el-icon>
                  Đổi mật khẩu
                </el-button>
                <el-button
                  size="default"
                  plain
                  class="w-full !ml-0"
                  type="danger"
                  @click="logout"
                >
                  <el-icon class="mr-2"><SwitchButton /></el-icon>
                  Đăng xuất
                </el-button>
              </div>
            </div>
          </el-popover>
        </div>
      </div>
    </div>
  </el-header>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import {
  ElButton,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElAvatar,
  ElPopover,
  ElTabs,
  ElTabPane,
  ElBadge,
  ElDivider,
  ElIcon,
} from 'element-plus';
import {
  Fold,
  Expand,
  Bell,
  User,
  ArrowDown,
  Lock,
  SwitchButton,
  Download,
} from '@element-plus/icons-vue';

const route = useRoute();

const emit = defineEmits<{
  (e: 'toggle-sidebar'): void;
}>();

const isCollapsed = ref(false);
const userAvatar = ref(''); // Set this to the user's actual avatar URL or leave empty for default icon

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
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

// Sample data for notifications and system news
const notifications = ref([
  { id: 1, content: 'Bạn có một tin nhắn mới' },
  { id: 2, content: 'Cuộc họp sắp bắt đầu trong 15 phút' },
  { id: 3, content: 'Nhiệm vụ mới đã được giao cho bạn' },
]);

const systemNews = ref([
  { id: 1, content: 'Hệ thống sẽ bảo trì vào ngày mai' },
  { id: 2, content: 'Phiên bản mới đã được cập nhật' },
  { id: 3, content: 'Chính sách bảo mật đã được cập nhật' },
]);

const viewProfile = () => {
  console.log('View profile clicked');
};

const changePassword = () => {
  console.log('Change password clicked');
};

const logout = () => {
  console.log('Logout clicked');
};
</script>

<style lang="scss" scoped>
$header-height: 60px;
$primary-color: #409eff;
$border-color: #dcdfe6;
$text-color: #333;
$background-color: #fff;

.header {
  background-color: $background-color;
  color: $text-color;
  line-height: $header-height;
  border-bottom: 1px solid $border-color;
  position: sticky;
  top: 0;
  z-index: 1000;

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;

    .left-section,
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

    .notification-badge {
      :deep(.el-badge__content) {
        top: 16px;
      }
    }

    .account-info {
      display: flex;
      align-items: center;
      cursor: pointer;

      .username {
        margin: 0 8px;
        font-weight: 500;
      }

      .arrow-icon {
        font-size: 12px;
        color: $text-color;
      }
    }
  }
}

:deep(.el-breadcrumb__inner) {
  &.is-link {
    font-weight: normal;
  }

  .el-breadcrumb__item:last-child & {
    font-weight: 600;
  }
}

.notification-list {
  list-style-type: none;
  padding: 0;
  margin: 0;

  li {
    padding: 8px 0;
    border-bottom: 1px solid #eee;

    &:last-child {
      border-bottom: none;
    }
  }
}

:deep(.notification-popover) {
  padding: 0;
  .el-tabs__content {
    padding: 10px;
  }
}

:deep(.account-popover) {
  padding: 16px;

  .account-details {
    .user-header {
      display: flex;
      align-items: center;
      margin-bottom: 16px;

      .el-avatar {
        margin-right: 16px;
      }

      .user-info {
        text-align: left;

        h3 {
          margin: 0 0 4px;
          font-size: 18px;
        }

        p {
          margin: 0;
          color: #666;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
