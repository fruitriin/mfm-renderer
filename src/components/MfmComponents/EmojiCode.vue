<template>
  <img v-if="emojiMap[token.name]" :src="emojiMap[token.name].url" class="emoji" />
  <span v-else>:{{ token.name }}:</span>
  <!--  <img class="emoji" :src="emoji()" />-->
</template>

<script lang="ts">
import { defineComponent, unref } from 'vue'

export default defineComponent({
  inject: ['emojis'],
  computed: {
    // provide 側は object でも computed でもよい
    emojiMap(): Record<string, any> {
      return unref(this.emojis as any) ?? {}
    }
  },
  props: ['token', 'children', 'className', 'class', 'style']
})
</script>

<style scoped>
.emoji {
  height: 2em;
  vertical-align: middle;
  transition: transform 0.2s ease;
}
</style>
