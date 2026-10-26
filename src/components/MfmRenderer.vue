<template>
  <MfmComponent :tokens="parsedMfm" />
</template>

<script setup lang="ts">
import { mfm, mfmClickEvKey } from '../utils/mfmUtil.ts'
import { computed, provide } from 'vue'
import MfmComponent from './Mfm.vue'

const props = defineProps<{
  text: string
}>()

const emit = defineEmits<{
  clickEv: [ev: string]
}>()

// $[clickable.ev=名前 ...] が押されたら clickEv イベントで ev の値を渡す
provide(mfmClickEvKey, (ev: string) => emit('clickEv', ev))

const parsedMfm = computed(() => mfm(props.text, false))
</script>

<style scoped></style>
