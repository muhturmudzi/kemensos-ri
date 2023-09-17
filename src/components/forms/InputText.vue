<template>
  <div :class="class">
    <label
      :for="name"
      class="text-sm text-[#828282] pl-2"
    >
      {{ label }}
    </label>

    <input
      :id="name"
      :name="name"
      class="input"
      :class="{'error': errorMessage}"
      :placeholder="placeholder"
      :value="value"
      :type="type"
      @input="onInput($event)"
      :disabled="disabled"
    />
    
    <span class="text-[#F24822] text-xs pl-2">{{ errorMessage }}</span>
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
  class: {
    type: String
  },
  type: {
    type: String,
    default: 'text'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  changeValue: {
    type: String
  }
})

const { value, errorMessage, handleChange } = useField(props.name)
const emit = defineEmits(['update:modelValue'])

const onInput = (event) => {
  handleChange(event, true)
  emit('update:modelValue', event.target.value)
}

watch(
  () => props.changeValue,
  (val) => {
    value.value = val
  }
)
</script>