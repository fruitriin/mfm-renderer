/**
 * Vue 版と React 版で共有する、フレームワークに依存しない処理
 */
import { parse, parseSimple } from 'mfm-js'
import type { MfmNode } from 'mfm-js'

export function mfm(text: string, plain: boolean): MfmNode[] {
  if (text == null || text === '') {
    return []
  }
  const ast = plain ? parseSimple(text) : parse(text)
  return ast
}

/**
 * MFM のノード種別や関数名から、構文ごとのコンポーネントの名前（接頭辞なし）を作る
 * 例: bold → Bold、blockCode → BlockCode、x2 → X2。空文字なら空文字を返す
 */
export function toComponentName(name: string): string {
  if (name === '') return ''
  return name.charAt(0).toUpperCase() + name.slice(1)
}

/** にゃー化するかどうか。Misskey と同じく、nyaize が 'respect' で投稿者が猫のときだけにゃー化する */
export function shouldNyaize(nyaize: boolean | 'respect' | undefined, author: { isCat?: boolean | null } | null | undefined): boolean {
  return nyaize === 'respect' ? author?.isCat === true : false
}

/**
 * misskey-js の nyaize を読み込む。必要になったときだけ読み込み、
 * 読み込めない環境（UMD を script タグで使う場合など）では null を返す
 */
export async function loadNyaize(): Promise<((text: string) => string) | null> {
  try {
    const { nyaize } = await import('misskey-js/nyaize.js')
    return nyaize
  } catch (error) {
    console.warn('nyaize を読み込めませんでした:', error)
    return null
  }
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
 * Misskey と同じく、小文字で書かれたものだけを受け付ける
 * @param style - 検証するボーダースタイル
 * @returns 有効なボーダースタイルならそのまま返し、無効ならundefinedを返す
 */
export function validBorderStyle(style: string | true | undefined | null): string | undefined {
  if (!style || typeof style !== 'string') return undefined
  const validStyles = ['hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset']
  return validStyles.includes(style) ? style : undefined
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

/** Twemoji の SVG の既定の置き場所。Misskey と同じ @discordapp/twemoji の版を、jsDelivr から読む */
export const DEFAULT_TWEMOJI_BASE = 'https://cdn.jsdelivr.net/npm/@discordapp/twemoji@16.0.1/dist/svg'

/** 絵文字から Twemoji の SVG のファイル名を作る（Misskey の char2twemojiFilePath と同じ規則） */
export function twemojiFileName(char: string): string {
  let codes = Array.from(char, (x) => x.codePointAt(0)?.toString(16) ?? '')
  if (!codes.includes('200d')) codes = codes.filter((x) => x !== 'fe0f')
  return codes.filter((x) => x.length > 0).join('-')
}
