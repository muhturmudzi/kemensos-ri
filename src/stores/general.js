import { defineStore } from 'pinia'

export const useGeneralStore = defineStore('general', {
  state: () => ({
    form: null,
    loading: false
  }),
  actions: {
    setForm (data) {
      this.form = data
    },
    showLoading () {
      this.loading = true
    },
    hideLoading () {
      this.loading = false
    }
  }
})