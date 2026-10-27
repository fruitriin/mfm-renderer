import type { MfmMathBlock } from 'mfm-js'
import type { MfmSyntaxProps } from '../context.ts'

/** Misskey と同じく、数式は描画せずにそのまま表示する */
export function MathBlock({ token }: MfmSyntaxProps<MfmMathBlock['props']>) {
  return <code className="math-block">{token?.formula}</code>
}
