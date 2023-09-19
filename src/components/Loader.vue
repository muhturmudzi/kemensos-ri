<template>
  <div class="loading">
    <Spinner width="5.5em"/>
  </div>
</template>

<style scoped>
.loading {
  content: '';
  background: rgba(0, 0, 0, 0.5);
  @apply fixed left-0 top-0 w-full h-full z-50;
}
</style>

<script setup>
import Spinner from '@/components/Spinner.vue'
</script>

