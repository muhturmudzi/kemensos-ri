<script setup>
import { useRouter } from 'vue-router'
import { reactive } from 'vue'
import { Form } from 'vee-validate'
import * as yup from 'yup'
import Step from '@/components/Step.vue'
import InputText from '@/components/forms/InputText.vue'
import InputSelect from '@/components/forms/InputSelect.vue'
import InputArea from '@/components/forms/InputArea.vue'

const router = useRouter()

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
  address: '',
  rt: '',
  rw: '',
  incomeBefore: '',
  incomeAfter: '',
  reason: '',
})

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
  address: yup.string().required().max(255, 'Maks 255 karakter').label('Alamat'),
  rt: yup.string().required().label('RT'),
  rw: yup.string().required().label('RW'),
  incomeBefore: yup.string().required().label('Penghasilan sebelum pandemi'),
  incomeAfter: yup.string().required().label('Penghasilan setelah pandemi'),
  reason: yup.string().required().max(255, 'Maks 255 karakter').label('Alasan'),
})

const goVerify = (values) => {
  console.log(values)
  router.push('/verify')
}
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