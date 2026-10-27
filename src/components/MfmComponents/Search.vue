<template>
  <div class="search">
    <input type="text" v-model="currentQuery" /><button @click="search">検索</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type Props = {
  token: { query: string }
  children?: object
  // 受け取らないと要素の className に入り、class="search" が消える
  className?: string
}

const props = defineProps<Props>()

const currentQuery = ref(props.token.query)

const search = () => {
  window.open(
    'https://www.google.com/search?q=' + encodeURIComponent(currentQuery.value),
    '_blank'
  )
}
</script>

<style scoped></style>
