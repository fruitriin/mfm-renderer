import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Mfm from './components/Mfm.vue'

// 全コンポーネントを自動取得
const mfmComponents = import.meta.glob('./components/MfmComponents/**/*.vue', {
  eager: true
})

const app = createApp(App)

// Mfm.vue だけは特殊な名前で登録
app.component('MfmComponent', Mfm)

// 残りは自動登録
Object.entries(mfmComponents).forEach(([path, module]) => {
  const componentName = path.split('/').pop()?.replace('.vue', '') || ''
  app.component(componentName, (module as any).default)
})

app.mount('#app')
