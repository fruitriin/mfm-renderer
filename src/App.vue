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

<script setup lang="ts">
import MfmRenderer from './components/MfmRenderer.vue'
import { samples } from './testCode'
import { computed, onMounted, provide, reactive, ref } from 'vue'
import MfmAst from './components/MfmAst.vue'

const ast = ref(false)
const debugMode = ref(false)
const domain = ref('misskey.systems')
const text = ref(`#mfmart @mention :110:
      **太字** <i>斜め</i> ~~打ち消し~~
\`inline code (JavaScript highlight)\`
> 引用
>> 引用の引用`)
const emojis = reactive<Record<string, any>>({})

provide('ast', computed(() => ast.value))
provide('debugMode', computed(() => debugMode.value))
provide('domain', computed(() => domain.value))
provide('emojis', computed(() => emojis))

const handler = (event: Event) => {
  return (event.target as HTMLTextAreaElement).value
}

const getEmojis = async () => {
  const emojisData = localStorage.getItem('emojis')
  if (emojisData) {
    const json = JSON.parse(emojisData) as {
      emojis: any[]
    }

    for (let emoji of json.emojis) {
      emojis[emoji.name] = emoji
    }
  } else {
    const res = await fetch(`https://${domain.value}/api/emojis`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({})
    })
    localStorage.setItem('emojis', JSON.stringify(await res.json()))

    await getEmojis()
  }
}

onMounted(() => {
  getEmojis()
})
</script>

<style></style>
