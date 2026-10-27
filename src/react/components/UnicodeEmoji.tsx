import type { MfmUnicodeEmoji } from 'mfm-js'
import type { MfmSyntaxProps } from '../context.ts'

// 本当は Twemoji や Fluent Emoji に置き換える
export function UnicodeEmoji({ token }: MfmSyntaxProps<MfmUnicodeEmoji['props']>) {
  return <span>{token?.emoji}</span>
}
