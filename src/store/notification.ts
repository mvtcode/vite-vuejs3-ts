import { ref } from 'vue';

const isAllow = ref(true);

export const getValue = () => {
  return isAllow.value;
};

export const setValue = (value: boolean) => {
  isAllow.value = value;
};

export const toggleValue = () => {
  isAllow.value = !isAllow.value;
};

export { isAllow };
