<script setup>
import { useRouter } from 'vue-router'
import { onMounted, reactive, ref, watch } from 'vue'
import { useGeneralStore } from '@/stores/general'
import axios from '@/services/axios.config.js'
import { Form } from 'vee-validate'
import * as yup from 'yup'
import Step from '@/components/Step.vue'
import InputText from '@/components/forms/InputText.vue'
import InputSelect from '@/components/forms/InputSelect.vue'
import InputArea from '@/components/forms/InputArea.vue'
import InputFile from '@/components/forms/InputFile.vue'

const router = useRouter()
const generalStore = useGeneralStore()

const listGender = [
  { value: 'L', label: 'Laki-laki' },
  { value: 'P', label: 'Perempuan' }
]

const formValues = reactive({
  name: '',
  nik: '',
  noKk: '',
  bornDate: '',
  gender: '',
  fileKtp: '',
  fileKK: '',
  province: '',
  regency: '',
  district: '',
  village: '',
  address: '',
  rt: '',
  rw: '',
  incomeBefore: '',
  incomeAfter: '',
  reason: '',
})

const listProvince = ref([])
const provSelected = ref('')
const getProvinces = async () => {
  try {
    const res = await axios.get('/provinces.json')
    listProvince.value = res
  } catch (error) {
    console.error(error)
  }
}
watch(
  () => provSelected.value,
  () => getRegencies()
)

const listRegency = ref([])
const regSelected = ref('')
const getRegencies = async () => {
  regSelected.value = ''
  disctSelected.value = ''
  vilSelected.value = ''

  try {
    const res = await axios.get(`/regencies/${provSelected.value}.json`)
    listRegency.value = res
  } catch (error) {
    console.error(error)
  }
}
watch(
  () => regSelected.value,
  () => getDistricts()
)

const listDistrict = ref([])
const disctSelected = ref('')
const getDistricts = async () => {
  disctSelected.value = ''
  vilSelected.value = ''
  if (!regSelected.value) return

  try {
    const res = await axios.get(`/districts/${regSelected.value}.json`)
    listDistrict.value = res
  } catch (error) {
    console.error(error)
  }
}
watch(
  () => disctSelected.value,
  () => getVillages()
)

const listVillage = ref([])
const vilSelected = ref('')
const getVillages = async () => {
  vilSelected.value = ''
  if (!disctSelected.value) return

  try {
    const res = await axios.get(`/villages/${disctSelected.value}.json`)
    listVillage.value = res
  } catch (error) {
    console.error(error)
  }
}

yup.setLocale({
  mixed: {
    required: ({label}) => `${label? `${label} ` : '*'}harus diisi`
  }
})

const schema = yup.object({
  name: yup.string().required().matches(/^[a-zA-Z]+[a-zA-Z ]*$/, 'Nama tidak valid').max(60, 'Maks 60 karakter').label('Nama'),
  nik: yup.string().required().matches(/^\d{16}$/, 'NIK tidak valid').label('NIK'),
  noKk: yup.string().required().matches(/^\d/, 'Nomor kartu keluarga tidak valid').label('Nomor kartu keluarga'),
  bornDate: yup.string().required()
    .test(
      'bod',
      'Minimal 25 tahun',
      (value) => {
        let birth_data = new Date(value)
        const diff_ms = Date.now() - birth_data.getTime()
        const age_dt = new Date(diff_ms)
        let diff = Math.abs(age_dt.getUTCFullYear() - 1970)

        return diff >= 25 && diff < 100
      }
    ).label('Tanggal lahir'),
  gender: yup.string().required().label('Jenis kelamin'),
  fileKtp: yup.string().required().label('KTP'),
  fileKK: yup.string().required().label('Kartu Keluarga'),
  province: yup.string().required().label('Provinsi'),
  regency: yup.string().required().label('Kab/Kota'),
  district: yup.string().required().label('Kecamatan'),
  village: yup.string().required().label('Kelurahan'),
  address: yup.string().required().max(255, 'Maks 255 karakter').label('Alamat'),
  rt: yup.string().required().max(3, 'Maks 3 karakter').label('RT'),
  rw: yup.string().required().max(3, 'Maks 3 karakter').label('RW'),
  incomeBefore: yup.string().required().label('Penghasilan sebelum pandemi'),
  incomeAfter: yup.string().required().label('Penghasilan setelah pandemi'),
  reason: yup.string().required().max(255, 'Maks 255 karakter').label('Alasan'),
})

const goVerify = (values) => {
  const gender = listGender.find(item => item.value === values.gender)

  const prov = listProvince.value.find(item => item.id === values.province)
  const reg = listRegency.value.find(item => item.id === values.regency)
  const dist = listDistrict.value.find(item => item.id === values.district)
  const vill = listVillage.value.find(item => item.id === values.village)

  const data = {
    ...values,
    genderName: gender.label,
    provinceName: prov.name,
    regencyName: reg.name,
    districtName: dist.name,
    villageName: vill.name
  }

  localStorage.setItem('form', JSON.stringify(data))
  generalStore.setForm(data)
  router.push('/verify')
}

onMounted(() => {
  getProvinces()

  if (!generalStore.form && !localStorage.getItem('form')) {
    return
  }

  if (!generalStore.form && localStorage.getItem('form')) {
    const data = JSON.parse(localStorage.getItem('form'))
    generalStore.setForm(data)
  }
  
  formValues.name = generalStore.form.name
  formValues.nik = generalStore.form.nik
  formValues.noKk = generalStore.form.noKk
  formValues.bornDate = generalStore.form.bornDate
  formValues.gender = generalStore.form.gender
  formValues.fileKtp = generalStore.form.fileKtp
  formValues.fileKK = generalStore.form.fileKK
  formValues.province = generalStore.form.province
  formValues.regency = generalStore.form.regency
  formValues.district = generalStore.form.district
  formValues.village = generalStore.form.village
  formValues.address = generalStore.form.address
  formValues.rt = generalStore.form.rt
  formValues.rw = generalStore.form.rw
  formValues.incomeBefore = generalStore.form.incomeBefore
  formValues.incomeAfter = generalStore.form.incomeAfter
  formValues.reason = generalStore.form.reason

  provSelected.value = generalStore.form.province
  regSelected.value = generalStore.form.regency
  disctSelected.value = generalStore.form.district
  vilSelected.value = generalStore.form.village
})
</script>

<template>
  <Step :step="1" />

  <section>
    <Form
      :initial-values="formValues"
      :validation-schema="schema"
      @submit="goVerify"
    >
      <div class="grid sm:grid-cols-2 gap-4 mb-4">
        <InputText
          label="Nama"
          name="name"
          placeholder="Masukan nama"
        />

        <InputText
          label="NIK"
          name="nik"
          type="number"
          placeholder="Masukan NIK"
        />

        <InputText
          label="NIK"
          name="noKk"
          type="number"
          placeholder="Masukan nomor Kartu Keluarga"
        />

        <InputText
          label="Tanggal Lahir"
          name="bornDate"
          type="date"
        />

        <InputSelect
          label="Jenis Kelamin"
          name="gender"
          placeholder="Pilih jenis kelamin"
          :listData="listGender"
          valueKey="value"
          labelKey="label"
        />
      </div>

      <div class="grid sm:grid-cols-2 gap-4 mb-4">
        <InputFile
          label="KTP"
          name="fileKtp"
          placeholder="Pilih file untuk upload KTP"
        />

        <InputFile
          label="Kartu Keluarga"
          name="fileKK"
          placeholder="Pilih file untuk upload Kartu Keluarga"
        />
      </div>

      <div class="w-full h-[1px] bg-[#E0E0E0] my-7"></div>

      <div class="grid sm:grid-cols-2 gap-4 mb-4">
        <InputSelect
          label="Provinsi"
          name="province"
          placeholder="Pilih provinsi"
          :listData="listProvince"
          valueKey="id"
          labelKey="name"
          v-model="provSelected"
        />

        <InputSelect
          label="Kab/Kota"
          name="regency"
          placeholder="Pilih kab/kota"
          :listData="listRegency"
          valueKey="id"
          labelKey="name"
          v-model="regSelected"
        />

        <InputSelect
          label="Kecamatan"
          name="district"
          placeholder="Pilih kecamatan"
          :listData="listDistrict"
          valueKey="id"
          labelKey="name"
          v-model="disctSelected"
        />

        <InputSelect
          label="Kelurahan"
          name="village"
          placeholder="Pilih kelurahan"
          :listData="listVillage"
          valueKey="id"
          labelKey="name"
          v-model="vilSelected"
        />
      </div>

      <InputArea
        label="Alamat"
        name="address"
        placeholder="Masukan alamat"
        class="mb-4"
      />

      <div class="grid sm:grid-cols-2 gap-4 mb-4">
        <InputText
          label="RT"
          name="rt"
          placeholder="Contoh: 012"
        />

        <InputText
          label="RW"
          name="rw"
          placeholder="Contoh: 012"
        />
      </div>

      <div class="w-full h-[1px] bg-[#E0E0E0] my-7"></div>

      <div class="grid sm:grid-cols-2 gap-4 mb-4">
        <InputText
          label="Penghasilan Sebelum Pandemi"
          name="incomeBefore"
          type="number"
          placeholder="Sebelum pandemi"
        />

        <InputText
          label="Penghasilan Setelah Pandemi"
          name="incomeAfter"
          type="number"
          placeholder="Setelah pandemi"
        />
      </div>

      <InputArea
        label="Alasan Membutuhkan Bantuan"
        name="reason"
        placeholder="Contoh: Kehilangan pekerjaan"
      />

      <div class="flex sm:justify-end mt-6">
        <button type="submit" class="btn btn--primary w-full sm:w-40">Lanjutkan</button>
      </div>
    </Form>
  </section>
</template>