<template>
  <el-button @click="test">test axios</el-button>
</template>

<script setup lang="ts">
import { login } from '../api/test.ts';

const test = async () => {
  console.log('test axios');
  const res = await login()
  console.log(res);
}
</script>

<style scoped>
</style>
