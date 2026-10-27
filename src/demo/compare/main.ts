/**
 * 同じ MFM を Vue 版と React 版で左右に並べて描画し、見た目を比べるページ
 */
import { createApp, h, reactive } from 'vue'
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import '../../style.css'
import '../../react/style.css'
import MfmPlugin from '../../library.ts'
import VueMfmRenderer from '../../components/MfmRenderer.vue'
import { MfmRenderer as ReactMfmRenderer } from '../../react/index.ts'
import type { MfmEmojis } from '../../react/index.ts'
import { loadEmojis } from '../emojis.ts'
import { samples } from '../samples.ts'
import './compare.css'

const domain = 'misskey.systems'

// 描画に渡すもの。変わったら両方を描画し直す
const state = reactive({
  text: samples.map((sample) => sample.body).join('\n\n'),
  isCat: false,
  advancedMfm: true,
  animatedMfm: true,
  plain: false,
  nowrap: false,
  emojis: {} as MfmEmojis
})

const rendererProps = () => ({
  text: state.text,
  nyaize: 'respect' as const,
  author: { isCat: state.isCat },
  advancedMfm: state.advancedMfm,
  animatedMfm: state.animatedMfm,
  plain: state.plain,
  nowrap: state.nowrap
})

const app = document.getElementById('app')!
app.innerHTML = `
  <h1>Vue 版と React 版を比べる</h1>
  <div class="compare-controls">
    <select id="sample">
      <option value="">すべてのサンプル</option>
      ${samples.map((sample, index) => `<option value="${index}">${sample.title}</option>`).join('')}
    </select>
    <label><input type="checkbox" data-option="isCat" /> にゃー化</label>
    <label><input type="checkbox" data-option="advancedMfm" checked /> 高度な MFM</label>
    <label><input type="checkbox" data-option="animatedMfm" checked /> アニメーション</label>
    <label><input type="checkbox" data-option="plain" /> plain</label>
    <label><input type="checkbox" data-option="nowrap" /> nowrap</label>
  </div>
  <textarea id="text" class="compare-text"></textarea>
  <div class="compare-panes">
    <section><h2>Vue</h2><div id="vue"></div></section>
    <section><h2>React</h2><div id="react"></div></section>
  </div>
`

const textarea = app.querySelector<HTMLTextAreaElement>('#text')!
textarea.value = state.text
textarea.addEventListener('input', () => {
  state.text = textarea.value
  renderReact()
})

app.querySelector<HTMLSelectElement>('#sample')!.addEventListener('change', (event) => {
  const value = (event.target as HTMLSelectElement).value
  state.text = value === '' ? samples.map((sample) => sample.body).join('\n\n') : samples[Number(value)].body
  textarea.value = state.text
  renderReact()
})

app.querySelectorAll<HTMLInputElement>('input[data-option]').forEach((input) => {
  input.addEventListener('change', () => {
    const option = input.dataset.option as 'isCat' | 'advancedMfm' | 'animatedMfm' | 'plain' | 'nowrap'
    state[option] = input.checked
    renderReact()
  })
})

// Vue 版
createApp({ render: () => h(VueMfmRenderer, rendererProps()) })
  .use(MfmPlugin)
  .provide('domain', domain)
  .provide('emojis', state.emojis)
  .mount('#vue')

// React 版
const reactRoot = createRoot(document.getElementById('react')!)
function renderReact() {
  reactRoot.render(createElement(ReactMfmRenderer, { ...rendererProps(), emojis: { ...state.emojis }, domain }))
}
renderReact()

loadEmojis(domain).then((emojis) => {
  Object.assign(state.emojis, emojis)
  renderReact()
})
