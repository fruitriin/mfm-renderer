<template>
  <div class="search">
    <input type="text" v-model="currentQuery" /><button @click="search">検索</button>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue'

export default {
  data() {
    return {
      currentQuery: this.token.query
    }
  },
  props: {
    token: {
      type: Object as PropType<{ query: string }>,
      required: true
    },
    children: {
      type: Object
    }
  },
  methods: {
    search() {
      window.open(
        'https://www.google.com/search?q=' + encodeURIComponent(this.currentQuery),
        '_blank'
      )
    }
  }
}
</script>

<style scoped></style>
