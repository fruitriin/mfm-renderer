import { MfmNode, parse, parseSimple } from 'mfm-js'
import { computed, inject } from 'vue'
import type { ComputedRef, InjectionKey } from 'vue'

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

/** Twemoji の SVG の既定の置き場所。Misskey と同じ @discordapp/twemoji の版を、jsDelivr から読む */
export const DEFAULT_TWEMOJI_BASE = 'https://cdn.jsdelivr.net/npm/@discordapp/twemoji@16.0.1/dist/svg'

/** 絵文字から Twemoji の SVG のファイル名を作る（Misskey の char2twemojiFilePath と同じ規則） */
export function twemojiFileName(char: string): string {
  let codes = Array.from(char, (x) => x.codePointAt(0)?.toString(16) ?? '')
  if (!codes.includes('200d')) codes = codes.filter((x) => x !== 'fe0f')
  return codes.filter((x) => x.length > 0).join('-')
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

export function mfm(text: string, plain: boolean): MfmNode[] {
  if (text == null || text === '') {
    return []
  }
  const ast = plain ? parseSimple(text) : parse(text)
  return ast
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
  return mfmComponentPrefix + string.replace(/(^.)(.*)/, (_$1, $2, $3) => `${$2.toUpperCase() + $3}`)
}

/**
 * 時間値の文字列が有効かどうかを検証する
 * 本家Misskeyの実装を参考に、-?[0-9.]+s の形式を許可
 * @param time - 検証する時間文字列
 * @returns 有効な時間文字列ならそのまま返し、無効ならundefinedを返す
 */
export function validTime(time: string | true | undefined | null): string | undefined {
  if (!time || typeof time !== 'string') return undefined
  if (/^-?[0-9.]+s$/.test(time)) return time
  return undefined
}

/**
 * 16進数カラーコードが有効かどうかを検証する
 * 3〜6桁の16進数を許可（本家Misskey準拠）
 * @param color - 検証するカラーコード（#なし）
 * @returns 有効なカラーコードならそのまま返し、無効ならundefinedを返す
 */
export function validColor(color: string | true | undefined | null): string | undefined {
  if (!color || typeof color !== 'string') return undefined
  if (/^[0-9a-f]{3,6}$/i.test(color)) return color
  return undefined
}

/**
 * ボーダースタイルが有効かどうかを検証する
 * @param style - 検証するボーダースタイル
 * @returns 有効なボーダースタイルならそのまま返し、無効ならundefinedを返す
 */
export function validBorderStyle(style: string | true | undefined | null): string | undefined {
  if (!style || typeof style !== 'string') return undefined
  const normalized = style.toLowerCase()
  const validStyles = ['hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset']
  return validStyles.includes(normalized) ? normalized : undefined
}

/**
 * 数値が有効かどうかを検証する（本家Misskey準拠）
 * parseFloatを使用し、負の値も許可
 * @param value - 検証する数値文字列
 * @returns 有効な数値ならパースした数値を返し、無効ならundefinedを返す
 */
export function validNumber(value: string | true | number | undefined | null): number | undefined {
  if (!value) return undefined
  if (typeof value === 'number') return value
  if (typeof value !== 'string') return undefined
  const num = parseFloat(value)
  if (isNaN(num)) return undefined
  return num
}
