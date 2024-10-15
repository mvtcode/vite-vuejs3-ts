<script setup lang="ts">
import { ref, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import { Lock, Message, View, Hide } from '@element-plus/icons-vue';
import type { FormInstance, FormRules } from 'element-plus';

const formRef = ref<FormInstance>();
const showPassword = ref(false);
const isLoading = ref(false);

const formModel = reactive({
  email: '',
  password: '',
  rememberMe: false,
});

const rules = reactive<FormRules>({
  email: [
    { required: true, message: 'Please input email address', trigger: 'blur' },
    {
      type: 'email',
      message: 'Please input correct email address',
      trigger: ['blur', 'change'],
    },
  ],
  password: [
    { required: true, message: 'Please input password', trigger: 'blur' },
    {
      min: 6,
      message: 'Password length should be at least 6 characters',
      trigger: 'blur',
    },
  ],
});

const handleLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      isLoading.value = true;
      setTimeout(() => {
        ElMessage.success('Login attempt with ' + formModel.email);
        isLoading.value = false;
      }, 3000);
    } else {
      console.log('error submit!', fields);
    }
  });
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Welcome Back
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Please sign in to your account
        </p>
      </div>
      <el-form
        ref="formRef"
        :model="formModel"
        :rules="rules"
        class="mt-8 space-y-6"
        @submit.prevent="handleLogin(formRef)"
      >
        <el-form-item prop="email">
          <label
            for="email-address"
            class="block text-sm font-medium text-gray-700 pb-1"
            >Email</label
          >
          <el-input
            size="default"
            id="email-address"
            v-model="formModel.email"
            type="email"
            autocomplete="email"
            :prefix-icon="Message"
            placeholder="you@example.com"
          />
        </el-form-item>

        <el-form-item prop="password">
          <label
            for="password"
            class="block text-sm font-medium text-gray-700 pb-1"
            >Password</label
          >
          <el-input
            size="default"
            id="password"
            v-model="formModel.password"
            :type="showPassword ? 'text' : 'password'"
            autocomplete="current-password"
            :prefix-icon="Lock"
            placeholder="Enter your password"
          >
            <template #suffix>
              <el-icon class="cursor-pointer" @click="togglePasswordVisibility">
                <View v-if="!showPassword" />
                <Hide v-else />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>

        <div class="flex items-center justify-between">
          <el-form-item prop="rememberMe">
            <el-checkbox v-model="formModel.rememberMe" class="text-indigo-600"
              >Remember me</el-checkbox
            >
          </el-form-item>

          <!-- <div class="text-sm">
            <a
              href="#"
              class="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Forgot your password?
            </a>
          </div> -->
        </div>
        <div>
          <el-button
            :loading="isLoading"
            size="default"
            type="primary"
            native-type="submit"
            class="w-full"
          >
            Sign in 1
          </el-button>
          <el-button
            :loading="isLoading"
            size="default"
            type="primary"
            native-type="submit"
            class="w-full mt-3 !ml-0"
          >
            Sign in 2
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>
