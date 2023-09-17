<template>
  <div :class="class">
    <label
      :for="name"
      class="text-sm text-[#828282] pl-2"
    >
      {{ label }}
    </label>

    <select
      :id="name"
      :name="name"
      class="input"
      :class="{'error': errorMessage}"
      :value="value"
      @change="onChange($event)"
      :disabled="disabled"
    >
      <option value="">{{ placeholder }}</option>
      <option v-for="(item, index) in listData" :key="`${name}-${index}`" :value="item[valueKey]">{{ item[labelKey] }}</option>
    </select>
    
    <span class="text-[#F24822] text-xs pl-2">{{ errorMessage }}</span>
  </div>
</template>

<script setup>
import { useField } from 'vee-validate'

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
  class: {
    type: String
  },
  listData: {
    type: Array,
    default: []
  },
  valueKey: {
    type: String
  },
  labelKey: {
    type: String
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const { value, errorMessage, handleChange } = useField(props.name)
const emit = defineEmits(['update:modelValue'])

const onChange = (event) => {
  handleChange(event, true)
  emit('update:modelValue', event.target.value)
}
</script>