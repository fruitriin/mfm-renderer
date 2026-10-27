import { createContext, useContext } from 'react'
import type { ComponentType, CSSProperties } from 'react'
import type { MfmNode } from 'mfm-js'

/**
 * 構文ごとのコンポーネントが受け取る props。Vue 版と同じ形にしている
 * - token: AST のノードの props（Fn では関数名と引数）
 * - children: AST のノードの子
 */
// 構文ごとに token の型が違うコンポーネントを 1 つの一覧（MfmComponentMap）に入れるため、既定は any にする
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MfmSyntaxProps<Token = any> = {
  token?: Token
  children?: MfmNode[]
  className?: string
  style?: CSSProperties
}

/** 構文ごとのコンポーネントの一覧。キーは接頭辞なしの名前（Bold・Link・X2 など） */
export type MfmComponentMap = Record<string, ComponentType<MfmSyntaxProps>>

/** カスタム絵文字の一覧。名前から画像の URL を引く */
export type MfmEmojis = Record<string, { url: string }>

/** MfmRenderer の props から決まる、描画全体にかかるオプション（Vue 版の MfmRenderOptions と同じ） */
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
}

/** MfmProvider と MfmRenderer で渡す、利用側の環境（Vue 版で provide する emojis・domain に当たる） */
export type MfmEnvironment = {
  emojis: MfmEmojis
  /** 接続先のサーバー。メンションのリンク先とアバターの取得に使う */
  domain: string | null
  /** 構文ごとのコンポーネント。差し替えたものだけを持つ */
  components: Partial<MfmComponentMap>
}

export const MfmEnvironmentContext = createContext<MfmEnvironment>({
  emojis: {},
  domain: null,
  components: {}
})

/** 描画の途中で変わる状態（Vue 版で provide/inject している値） */
export type MfmRenderState = {
  options: MfmRenderOptions
  /** 文字の倍率。rootScale から始まり、x2〜x4 と scale で掛け合わされる */
  scale: number
  /** 引用とリンクの中ではにゃー化しない（Misskey の disableNyaize と同じ） */
  disableNyaize: boolean
  /** $[clickable] が押されたときに呼ぶ */
  onClickEv: (ev: string) => void
}

/** MfmRenderer の外で使われたときは、Misskey の既定と同じくすべて有効として描画する */
export const MfmRenderContext = createContext<MfmRenderState>({
  options: { plain: false, nowrap: false, advancedMfm: true, animatedMfm: true, nyaize: null },
  scale: 1,
  disableNyaize: false,
  onClickEv: () => {}
})

export function useMfmEnvironment(): MfmEnvironment {
  return useContext(MfmEnvironmentContext)
}

export function useMfmRender(): MfmRenderState {
  return useContext(MfmRenderContext)
}

/** アニメーションを付けてよいか（Misskey の useAnim と同じ） */
export function useMfmAnimation(): boolean {
  const { options } = useMfmRender()
  return options.advancedMfm && options.animatedMfm
}

/** 引用・リンクの中を除いて、にゃー化する関数を返す */
export function useMfmNyaize(): (text: string) => string {
  const { options, disableNyaize } = useMfmRender()
  return !disableNyaize && options.nyaize ? options.nyaize : (text: string) => text
}

/** class の文字列をつなぐ。空のものは除く */
export function cx(...names: (string | false | null | undefined)[]): string | undefined {
  const joined = names
    .filter(Boolean)
    .join(' ')
    .split(/\s+/)
    .filter(Boolean)
    .join(' ')
  return joined === '' ? undefined : joined
}
