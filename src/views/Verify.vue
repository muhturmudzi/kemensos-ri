<script setup>
import { useRouter } from 'vue-router'
import Step from '@/components/Step.vue'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <Step :step="2" />

  <section class="flex justify-center sm:justify-end">
    <button class="btn btn--primary-outline w-full sm:w-40 mr-4" @click="goHome()">Kembali</button>
    <button class="btn btn--primary w-full sm:w-40">Simpan</button>
  </section>
</template>