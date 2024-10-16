import { ref } from 'vue';

const currentPath = ref(window.location.pathname);

setInterval(() => {
  currentPath.value = window.location.pathname;
}, 1000);

export { currentPath };
