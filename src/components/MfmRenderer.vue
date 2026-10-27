<template>
  <!-- nowrap のときだけ Misskey と同じく 1 行に収める。それ以外は今までどおり包まずに描画する -->
  <span v-if="nowrap" class="mfm-nowrap">
    <MfmComponent :tokens="parsedMfm" />
  </span>
  <MfmComponent v-else :tokens="parsedMfm" />
</template>

<script setup lang="ts">
import {
  mfm,
  mfmClickEvKey,
  mfmRenderOptionsKey,
  mfmScaleKey,
  DEFAULT_TWEMOJI_BASE
} from '../utils/mfmUtil.ts'
import type { MfmRenderOptions } from '../utils/mfmUtil.ts'
import { loadNyaize, shouldNyaize as decideNyaize } from '../core/index.ts'
import { computed, provide, shallowRef, watch } from 'vue'
import MfmComponent from './Mfm.vue'

const props = withDefaults(
  defineProps<{
    text: string
    /** 改行を空白にし、テキスト・絵文字・プレーンだけを解析する（ユーザー名など向け） */
    plain?: boolean
    /** 1 行に収め、はみ出たら省略する */
    nowrap?: boolean
    /** 文字の倍率の初期値 */
    rootScale?: number
    /** 'respect' のとき、author.isCat が true ならにゃー化する（Misskey と同じく true ではにゃー化しない） */
    nyaize?: boolean | 'respect'
    /** 投稿者。nyaize の判定に使う */
    author?: { isCat?: boolean | null } | null
    /** false のときは x2〜x4・position・scale を効かせず、アニメーションも止める */
    advancedMfm?: boolean
    /** false のときはアニメーションを止める */
    animatedMfm?: boolean
    /** Unicode の絵文字の描き方。'native' は OS の絵文字、'twemoji' は Twemoji の画像（Misskey の既定の見た目） */
    emojiStyle?: 'native' | 'twemoji'
    /** Twemoji の SVG を置いている場所。省くと jsDelivr の @discordapp/twemoji を使う */
    twemojiBase?: string
  }>(),
  {
    plain: false,
    nowrap: false,
    rootScale: 1,
    nyaize: false,
    author: null,
    advancedMfm: true,
    animatedMfm: true,
    emojiStyle: 'native',
    twemojiBase: DEFAULT_TWEMOJI_BASE
  }
)

const emit = defineEmits<{
  clickEv: [ev: string]
}>()

// $[clickable.ev=名前 ...] が押されたら clickEv イベントで ev の値を渡す
provide(mfmClickEvKey, (ev: string) => emit('clickEv', ev))

const shouldNyaize = computed(() => decideNyaize(props.nyaize, props.author))

// にゃー化は misskey-js の nyaize を使う。必要になったときだけ読み込み、読み込めない環境（UMD を script タグで使う場合など）ではにゃー化しない
const nyaizeFn = shallowRef<((text: string) => string) | null>(null)
watch(
  shouldNyaize,
  async (should) => {
    if (!should || nyaizeFn.value) return
    nyaizeFn.value = await loadNyaize()
  },
  { immediate: true }
)

provide(
  mfmRenderOptionsKey,
  computed<MfmRenderOptions>(() => ({
    plain: props.plain,
    nowrap: props.nowrap,
    advancedMfm: props.advancedMfm,
    animatedMfm: props.animatedMfm,
    nyaize: shouldNyaize.value ? nyaizeFn.value : null,
    emojiStyle: props.emojiStyle,
    twemojiBase: props.twemojiBase.replace(/\/+$/, '')
  }))
)
provide(
  mfmScaleKey,
  computed(() => props.rootScale)
)

const parsedMfm = computed(() => mfm(props.text, props.plain))
</script>

<style scoped>
/* Misskey のスタイルに加え、親が block でなくても省略されるよう inline-block にする */
.mfm-nowrap {
  display: inline-block;
  max-width: 100%;
  vertical-align: bottom;
  white-space: pre;
  word-wrap: normal;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
