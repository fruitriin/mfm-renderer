import { ref } from 'vue'
import { samples as baseSamples } from './demo/samples.ts'

// サンプルはプレビューの画面で書き換えられるので、元の一覧を写して使う
export const samples = ref(baseSamples.map((sample) => ({ ...sample })))
