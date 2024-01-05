<template>
  <div>
    <h1>MFM Renderer</h1>
    <div style="position: fixed; right: 0; top: 0; background: wheat">
      モード
      <div>
        <label><input type="checkbox" v-model="debugMode" /> デバッグモード</label>
      </div>
      <div>
        <label><input type="checkbox" v-model="ast" /> AST</label>
      </div>
      <div>
        <input v-model.lazy="domain" />
      </div>

      <div v-if="false" style="overflow-x: hidden; overflow-y: auto; width: 300px; height: 10rem">
        <pre>{{ Object.keys(emojis) }}</pre>
      </div>
    </div>
    <hr />
    <div style="display: flex">
      <div style="width: 50%; padding: 8px">
        <MfmRenderer :text="text" />
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
        <MfmRenderer :text="sample.body" />
        <MfmAst v-if="ast" :text="sample.body" />

        <hr />
      </div>
      <div style="width: 50%; padding: 8px">
        <h4>元テキスト</h4>
        <textarea
          @input="samples[key].body = handler($event)"
          :value="sample.body"
          style="height: 6rem; width: 100%"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import MfmRenderer from './components/MfmRenderer.vue'
import { samples } from './testCode'
import { computed, defineComponent } from 'vue'
import MfmAst from './components/MfmAst.vue'

export default defineComponent({
  components: {
    MfmAst,
    MfmRenderer
  },
  provide() {
    return {
      ast: computed(() => this.ast),
      debugMode: computed(() => this.debugMode),
      domain: computed(() => this.domain),
      emojis: computed(() => this.emojis)
    }
  },
  data() {
    return {
      ast: false,
      debugMode: false,
      domain: 'misskey.systems',
      text: `#mfmart @mention :110:
      **太字** <i>斜め</i> ~~打ち消し~~
\`inline code (JavaScript highlight)\`
> 引用
>> 引用の引用`,
      samples,
      emojis: {} as Record<string, any>
    }
  },
  mounted() {
    this.getEmojis()
  },
  methods: {
    handler(event: Event) {
      return (event.target as HTMLTextAreaElement).value
    },
    async getEmojis() {
      const emojis = localStorage.getItem('emojis')
      if (emojis) {
        const json = JSON.parse(emojis) as {
          emojis: any[]
        }

        for (let emoji of json.emojis) {
          this.emojis[emoji.name] = emoji
        }
      } else {
        const res = await fetch(`https://${this.domain}/api/emojis`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          },
          body: JSON.stringify({})
        })
        localStorage.setItem('emojis', JSON.stringify(await res.json()))

        await this.getEmojis()
      }
    }
  }
})
</script>

<style></style>
