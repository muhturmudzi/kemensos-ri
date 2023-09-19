<script setup>
import { useGeneralStore } from '@/stores/general'
import Header from '@/components/layouts/Header.vue'
import Loader from '@/components/Loader.vue'

const generalStore = useGeneralStore()

</script>

<template>
  <div class="bg-[#FBFBFB]">
    <Header />
  
    <div class="container mx-auto sm:px-5 mb-8">
      <main class="max-w-4xl my-0 mx-auto bg-white sm:border border-solid border-[#EDEFF2] rounded-xl py-4 sm:py-10 px-5 sm:px-12 min-h-screen">
        <section class="text-center">
          <img
            class="sm:hidden mx-auto mb-6"
            src="@/assets/images/kemensos-logo.png"
            alt="kemensos"
          />
          <h1 class="text-xl sm:text-3xl text-[#333333] font-semibold mb-4">Bantuan Sosial (Bansos) <br> Covid-19</h1>
          <p class="sm:text-xl text-[#828282]">Lengkapi data valid untuk penerima <br> Bantuan Sosial (Bansos) Covid-19</p>
        </section>

        <router-view></router-view>
      </main>
    </div>
  </div>

  <Loader v-if="generalStore.loading" />
</template>