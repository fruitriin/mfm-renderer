<template>
  <ruby>
    {{ ruby.body }}
    <rt>{{ ruby.yomi }}</rt>
  </ruby>
</template>

<script lang="ts">
export default {
  props: ['children', 'token', 'style', 'className'],
  computed: {
    ruby() {
      const ruby = this.children[0].props.text.split(' ')
      return {
        body: ruby[0],
        yomi: ruby[1]
      }
    }
  }
}
</script>

<style scoped></style>
