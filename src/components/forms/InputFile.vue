<template>
  <div class="input-file" :class="{'error': errorMessage}">
    <label
      :for="name"
      class="text-sm font-semibold text-[#828282]"
    >
      {{ label }}
    </label>

    <input
      :id="`file-${name}`"
      type="file"
      accept="image/jpeg, image/jpg, image/png, image/bmp"
      @change="onChangeFile"
      class="hidden"
    />
      
    <input
      :id="name"
      :name="name"
      :value="value"
      class="hidden"
    />

    <p class="text-sm text-[#828282] mb-2">{{ placeholder }}</p>
    <img v-if="value" :src="value" :alt="value" class="mb-2 mx-auto" />
    <button
      class="btn btn--primary-outline !text-sm !font-normal mb-2"
      @click="clickFile()"
      type="button"
    >
      Klik untuk upload
    </button>
    <p class="text-[#F24822] text-xs">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { useField } from 'vee-validate'
import { watch } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
  },
  placeholder: {
    type: String,
  },
  modelValue: {
    type: String
  }
})

const { value, errorMessage, handleChange, setErrors } = useField(props.name)
const emit = defineEmits(['update:modelValue, onChange'])

const clickFile = () => {
  document.getElementById(`file-${props.name}`).click()
}

const onChangeFile = (event) => {
  const file = event.target.files[0]
  const url = URL.createObjectURL(file)

  const checkName = file.name.split('.')
  if (checkName.length > 2) {
    setErrors('Nama file tidak valid')
    return
  }

  const size = file.size / 1024 / 1024
  if (size > 2) {
    setErrors('Maks 2 MB')
    return
  }

  const mime = file.type
  if (mime !== 'image/jpeg' && mime !== 'image/png' && mime !== 'image/jpg' && mime !== 'image/bmp') {
    setErrors('Tipe file tidak valid')
    return
  }

  handleChange(url, true)
	emit('onChange', file)
  emit('update:modelValue', url)
}

watch(
  () => props.modelValue,
  (val) => {
    value.value = val
  }
)
</script>