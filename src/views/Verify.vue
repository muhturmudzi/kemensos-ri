<script setup>
import { useRouter } from 'vue-router'
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

const formatRp = (value) => {
  if (!value) return

  return value.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1\.")
}

const goHome = () => {
  router.push('/')
}

const save = () => {
  generalStore.showLoading()

  setTimeout(() => {
    generalStore.hideLoading()
  }, 1500)
}
</script>

<template>
  <Step :step="2" />

  <section class="mb-6">
    <table class="table">
      <tr v-for="item in keyData" :key="item.key">
        <th>
          <p>{{ item.label }}</p>
        </th>
        <td>
          <p v-if="item.key === 'incomeBefore' || item.key === 'incomeAfter'">Rp {{ formatRp(generalStore.form[item.key]) }}</p>
          <img v-else-if="item.key === 'fileKtp' || item.key === 'fileKK'" :src="generalStore.form[item.key]" :alt="generalStore.form[item.key]">
          <p v-else>{{ generalStore.form[item.key] }}</p>
        </td>
      </tr>
    </table>
  </section>

  <section class="flex justify-center sm:justify-end">
    <button class="btn btn--primary-outline w-full sm:w-40 mr-2 sm:mr-4" @click="goHome()">Kembali</button>
    <button class="btn btn--primary w-full sm:w-40" @click="save()">Simpan</button>
  </section>
</template>