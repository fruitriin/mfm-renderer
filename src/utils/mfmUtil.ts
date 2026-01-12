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
  if (/^\-?[0-9.]+s$/.test(time)) return time
  return undefined
}
