<template>
  <component
    :is="getComponent(token.name)"
    :className="`Fn ${token.name} ${className ?? ''}`"
    :token="token"
    :children="children"
    :style=" style"
  />
</template>

<script lang="ts">
import {getComponent} from "../../utils/mfmUtil.ts";

export default {
  methods: {getComponent},
  props: ["token", "tokens", "children", "style", "className"],
};
</script>

<style>
.Fn {
  display: inline-block;
}

</style>
