<script setup>
const props = defineProps({
  step: {
    type: Number,
    required: true,
    default: 1
  }
})

const listStep = [
  {
    step: 1,
    title: 'Data Penerima'
  },
  {
    step: 2,
    title: 'Verifikasi'
  },
]
</script>

<template>
  <section>
    <ul class="list-step">
      <li
        v-for="item in listStep"
        :key="item.step"
      >
        <div :class="`step ${item.step <= step? 'active' : ''}`"></div>
        <div>
          <span>STEP {{ item.step }}</span>
          <p>{{ item.title }}</p>
        </div>
      </li>
    </ul>
  </section>
</template>