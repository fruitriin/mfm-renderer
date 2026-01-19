import { MfmNode, parse, parseSimple } from 'mfm-js'

export function mfm(text: string, plain: boolean): MfmNode[] {
  if (text == null || text === '') {
    return []
  }
  const ast = plain ? parseSimple(text) : parse(text)
  return ast
}

/**
 * MfmVueがAST Nodeからコンポーネントを決定するためのもの
 * <component :is=getComponent(token.type)>
 * @param string
 */
export function getComponent(string: string) {
  return string.replace(/(^.)(.*)/, (_$1, $2, $3) => `${$2.toUpperCase() + $3}`)
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
