<template>
  <div>
    <h1>MFM Renderer</h1>
    <div>モード</div>
    <label><input type="checkbox" v-model="debugMode" /> デバッグモード</label>
    <hr />
    <div style="display: flex">
      <div style="width: 50%; padding: 8px">
        <MfmText :text="text" />
      </div>
      <div style="width: 50%; padding: 8px">
        <textarea v-model="text" style="height: 6rem; width: 100%" />
      </div>
    </div>

    <hr />
    <h2>テストコード</h2>
    <div style="display: flex" v-for="(sample, key) in samples">
      <div style="width: 50%; padding: 8px">
        <h4>Parsed MFM</h4>
        <hr />
        <MfmText :text="sample" />
        <hr />
      </div>
      <div style="width: 50%; padding: 8px">
        <h4>元テキスト</h4>
        <textarea
          @input="samples[key] = $event?.target?.value"
          :value="sample"
          style="height: 6rem; width: 100%"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import MfmText from "./components/MfmText.vue";
import { samples } from "./testCode.ts";
import { computed } from "vue";

export default {
  components: {
    MfmText,
  },
  provide() {
    return {
      debugMode: computed(() => this.debugMode),
    };
  },
  data() {
    return {
      debugMode: true,
      text: "うま$[ruby 味 あじ] @mention :blob_dj: `inlineCode` ```blockCode```",
      samples,
    };
  },
};
</script>

<style></style>
