<template>
  <div>
    <h1>MFM Renderer</h1>
    <div style="position: fixed; right: 0; top: 0; background: wheat">
      モード
      <div>
        <label
          ><input type="checkbox" v-model="debugMode" /> デバッグモード</label
        >
      </div>
      <div>
        <label><input type="checkbox" v-model="ast" /> AST</label>
      </div>
      <div>
        <input v-model="domain" />
      </div>
    </div>
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
        <h4>Parsed MFM: ({{ sample.title }})</h4>
        <hr />
        <MfmText :text="sample.body" />
        <MfmAst v-if="ast" :text="sample.body" />

        <hr />
      </div>
      <div style="width: 50%; padding: 8px">
        <h4>元テキスト</h4>
        <textarea
          @input="samples[key].body = $event?.target?.value"
          :value="sample.body"
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
import MfmAst from "./components/MfmAst.vue";

export default {
  components: {
    MfmAst,
    MfmText,
  },
  provide() {
    return {
      ast: computed(() => this.ast),
      debugMode: computed(() => this.debugMode),
      domain: computed(() => this.domain),
    };
  },
  data() {
    return {
      ast: false,
      debugMode: false,
      domain: "misskey.systems",
      text: "うま$[ruby 味 あじ] @nekokan blob_dj:",
      samples,
    };
  },
};
</script>

<style></style>
