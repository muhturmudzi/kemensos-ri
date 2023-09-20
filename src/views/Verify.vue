<script setup>
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useGeneralStore } from '@/stores/general'
import Step from '@/components/Step.vue'

const router = useRouter()
const generalStore = useGeneralStore()

const keyData = [
  { key: 'name', label: 'Nama' },
  { key: 'nik', label: 'NIK' },
  { key: 'noKk', label: 'Nomor Kartu Keluarga' },
  { key: 'bornDate', label: 'Tanggal Lahir' },
  { key: 'genderName', label: 'Jenis Kelamin' },
  { key: 'fileKtp', label: 'File KTP' },
  { key: 'fileKK', label: 'File Kartu Keluarga' },
  { key: 'provinceName', label: 'Provinsi' },
  { key: 'regencyName', label: 'Kab/Kota' },
  { key: 'districtName', label: 'Kecamatan' },
  { key: 'villageName', label: 'Kelurahan' },
  { key: 'address', label: 'Alamat' },
  { key: 'rt', label: 'RT' },
  { key: 'rw', label: 'RW' },
  { key: 'incomeBefore', label: 'Penghasilan Sebelum Pandemi' },
  { key: 'incomeAfter', label: 'Penghasilan Setelah Pandemi' },
  { key: 'reason', label: 'Alasan Membutuhkan Bantuan' },
]

const aggrement = ref(false)

const goHome = () => {
  router.push('/')
}

const save = () => {
  if (!aggrement.value) return

  generalStore.showLoading()
  const math = Math.random()
  
  setTimeout(() => {
    generalStore.hideLoading()

    if (math < .5) {
      alert('Data Gagal Disimpan')
      return
    }

    alert('Sukses Menyimpan Data')
    generalStore.$reset()
    localStorage.clear()
    router.push('/')
  }, 1500)
}

onMounted(() => {
  if (!generalStore.form && !localStorage.getItem('form')) {
    router.push('/')
    return
  }

  if (!generalStore.form && localStorage.getItem('form')) {
    const data = JSON.parse(localStorage.getItem('form'))
    generalStore.setForm(data)
  }
})

const formatRp = (value) => {
  if (!value) return

  return value.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1\.")
}

const months = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember'
]

const formatDate = (value) => {
  if (!value) return

  const date = new Date(value)
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
}
</script>

<template>
  <Step :step="2" />

  <section class="mb-6" v-if="generalStore.form">
    <table class="table">
      <tr v-for="item in keyData" :key="item.key">
        <th>
          <p>{{ item.label }}</p>
        </th>
        <td>
          <p v-if="item.key === 'incomeBefore' || item.key === 'incomeAfter'">Rp {{ formatRp(generalStore.form[item.key]) }}</p>
          <p v-else-if="item.key === 'bornDate'">{{ formatDate(generalStore.form[item.key]) }}</p>
          <img v-else-if="item.key === 'fileKtp' || item.key === 'fileKK'" :src="generalStore.form[item.key]" :alt="generalStore.form[item.key]">
          <p v-else>{{ generalStore.form[item.key] }}</p>
        </td>
      </tr>
    </table>
  </section>

  <section class="mb-6">
    <div class="flex items-center">
      <input id="aggrement-checkbox" type="checkbox" v-model="aggrement" class="w-6 h-6 text-[#369AB0] bg-[#369AB0] border-gray-300 rounded cursor-pointer">
      <label for="aggrement-checkbox" class="ml-3 text-sm font-medium">Saya menyatakan bahwa data yang diisikan adalah benar dan siap mempertanggungjawabkan apabila ditemukan ketidaksesuaian dalam data tersebut.</label>
    </div>
  </section>

  <section class="flex justify-center sm:justify-end">
    <button class="btn btn--primary-outline w-full sm:w-40 mr-2 sm:mr-4" @click="goHome()">Kembali</button>
    <button class="btn btn--primary w-full sm:w-40" :class="{'cursor-not-allowed opacity-50': !aggrement}" @click="save()">Simpan</button>
  </section>
</template>