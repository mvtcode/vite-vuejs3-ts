import { ElMessageBox, ElMessage } from 'element-plus';
import { isAllow } from '@/store/notification';

export const confirm = (text: string, callback: any) => {
  ElMessageBox.confirm(text).then(() => {
    if (callback) callback();
  });
};

export const showConfirm = (text: string) => {
  return ElMessageBox.confirm(text, 'Xác nhận', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Hủy',
    type: 'warning',
  });
};

export const showSuccess = (text: string) => {
  ElMessage({
    message: text,
    type: 'success',
    grouping: true,
  });
};

export const showError = (text: string) => {
  if (isAllow.value) {
    ElMessage({
      message: text,
      type: 'warning',
      grouping: true,
    });
  }
};

export const showErrorResponse = (e: any) => {
  showError(e.response?.data?.message ? e.response.data.message : e.message);
};
