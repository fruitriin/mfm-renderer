import type { MfmMathInline } from 'mfm-js'
import type { MfmSyntaxProps } from '../context.ts'

/** Misskey と同じく、数式は描画せずにそのまま表示する */
export function MathInline({ token }: MfmSyntaxProps<MfmMathInline['props']>) {
  return <code className="math-inline">{token?.formula}</code>
}
