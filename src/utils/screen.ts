import { ref } from 'vue';

const height = ref(window.innerHeight);
const width = ref(window.innerWidth);
window.addEventListener('resize', () => {
  height.value = window.innerHeight;
  width.value = window.innerWidth;
});

export { height, width };
