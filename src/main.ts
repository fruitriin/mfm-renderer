import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Mfm from './components/Mfm.vue'
import { mfmComponentPrefix } from './utils/mfmUtil.ts'

// 全コンポーネントを自動取得
const mfmComponents = import.meta.glob('./components/MfmComponents/**/*.vue', {
  eager: true
})

const app = createApp(App)

// Mfm.vue だけは特殊な名前で登録
app.component('MfmComponent', Mfm)

// 残りはライブラリと同じく Mfm 接頭辞を付けて自動登録（Bold.vue → MfmBold）
Object.entries(mfmComponents).forEach(([path, module]) => {
  const componentName = path.split('/').pop()?.replace('.vue', '') || ''
  app.component(mfmComponentPrefix + componentName, (module as any).default)
})

app.mount('#app')
