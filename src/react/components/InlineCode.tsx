import type { MfmInlineCode } from 'mfm-js'
import type { MfmSyntaxProps } from '../context.ts'

export function InlineCode({ token }: MfmSyntaxProps<MfmInlineCode['props']>) {
  return <code className="inline-code">{token?.code}</code>
}
