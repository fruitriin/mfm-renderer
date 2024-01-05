<template>
  <pre class="inline-code">{{ token.code }}</pre>
</template>

<script lang="ts">
export default {
  props: ['token', 'children', 'style', 'className']
}
</script>
