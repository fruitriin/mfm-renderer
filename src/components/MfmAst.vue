<template>
  <pre>{{ parsedMfm }}</pre>
</template>

<script setup lang="ts">
import { mfm } from '../utils/mfmUtil.ts'
import { computed } from 'vue'

const props = defineProps<{
  text: string
}>()

const parsedMfm = computed(() => mfm(props.text, false))
</script>

<style scoped></style>
