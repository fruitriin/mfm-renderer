import { DEFAULT_TWEMOJI_BASE, toComponentName } from '../core/index.ts'
import { computed, inject } from 'vue'
import type { ComputedRef, InjectionKey } from 'vue'

// フレームワークに依存しない処理は core にある。以前からの import 先を変えないよう、ここからも使えるようにする
export {
  mfm,
  validTime,
  validColor,
  validBorderStyle,
  validNumber,
  DEFAULT_TWEMOJI_BASE,
  twemojiFileName
} from '../core/index.ts'

/** $[clickable] から MfmRenderer へクリックを伝えるための provide/inject のキー */
export const mfmClickEvKey: InjectionKey<(ev: string) => void> = Symbol('mfmClickEv')

/** MfmRenderer の props から決まる、描画全体にかかるオプション */
export type MfmRenderOptions = {
  /** 改行を空白にし、カスタム絵文字を小さく表示する */
  plain: boolean
  /** 1 行に収め、はみ出たら省略する */
  nowrap: boolean
  /** false のときは x2〜x4・position・scale を効かせず、アニメーションも止める */
  advancedMfm: boolean
  /** false のときはアニメーションを止める */
  animatedMfm: boolean
  /** にゃー化する関数。にゃー化しないとき（読み込み中を含む）は null */
  nyaize: ((text: string) => string) | null
  /** Unicode の絵文字の描き方。'native' は OS の絵文字、'twemoji' は Twemoji の画像（Misskey の既定） */
  emojiStyle: 'native' | 'twemoji'
  /** Twemoji の SVG を置いている場所（末尾の / はなし） */
  twemojiBase: string
}

const defaultRenderOptions: MfmRenderOptions = {
  plain: false,
  nowrap: false,
  advancedMfm: true,
  animatedMfm: true,
  nyaize: null,
  emojiStyle: 'native',
  twemojiBase: DEFAULT_TWEMOJI_BASE
}

export const mfmRenderOptionsKey: InjectionKey<ComputedRef<MfmRenderOptions>> = Symbol('mfmRenderOptions')

/** 引用とリンクの中ではにゃー化しない（Misskey の disableNyaize と同じ） */
export const mfmDisableNyaizeKey: InjectionKey<boolean> = Symbol('mfmDisableNyaize')

/** 文字の倍率。rootScale から始まり、x2〜x4 と scale で掛け合わされる */
export const mfmScaleKey: InjectionKey<ComputedRef<number>> = Symbol('mfmScale')

/** MfmRenderer の外で使われたときは、Misskey の既定と同じくすべて有効として描画する */
export function useMfmRenderOptions(): ComputedRef<MfmRenderOptions> {
  return inject(mfmRenderOptionsKey, () => computed(() => defaultRenderOptions), true)
}

/** アニメーションを付けてよいか（Misskey の useAnim と同じ） */
export function useMfmAnimation(): ComputedRef<boolean> {
  const options = useMfmRenderOptions()
  return computed(() => options.value.advancedMfm && options.value.animatedMfm)
}

/** 引用・リンクの中を除いて、にゃー化する関数を返す */
export function useMfmNyaize(): ComputedRef<(text: string) => string> {
  const options = useMfmRenderOptions()
  const disabled = inject(mfmDisableNyaizeKey, false)
  return computed(() => {
    const nyaize = options.value.nyaize
    return !disabled && nyaize ? nyaize : (text: string) => text
  })
}

export function useMfmScale(): ComputedRef<number> {
  return inject(mfmScaleKey, () => computed(() => 1), true)
}

/**
 * 構文ごとのコンポーネントをグローバル登録するときの接頭辞。
 * 利用側のコンポーネント（Link・Search など）と名前が衝突しないように付ける
 */
export const mfmComponentPrefix = 'Mfm'

/**
 * MfmVueがAST Nodeからコンポーネントを決定するためのもの
 * <component :is=getComponent(token.type)>
 * 例: bold → MfmBold、x2 → MfmX2。空文字なら空文字を返す
 * @param string
 */
export function getComponent(string: string) {
  if (string === '') return ''
  return mfmComponentPrefix + toComponentName(string)
}
