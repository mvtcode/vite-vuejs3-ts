import { defineStore } from 'pinia'

const appStore = defineStore('notification', {
  state: () => ({
    loading: false,
    errorCode: '',
  }),
  getters: {
    getLoading: (state) => state.loading,
    getErrorCode: (state) => state.errorCode,
  },
  actions: {
    setLoading(data) {
      this.loading = data
    },
    setErrorCode(data) {
      this.errorCode = data
    }
  }
})
export default appStore
