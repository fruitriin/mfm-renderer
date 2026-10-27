import { useState } from 'react'
import type { MfmUnicodeEmoji } from 'mfm-js'
import { twemojiFileName } from '../../core/index.ts'
import { useMfmRender } from '../context.ts'
import type { MfmSyntaxProps } from '../context.ts'

export function UnicodeEmoji({ token, style }: MfmSyntaxProps<MfmUnicodeEmoji['props']>) {
  const { options } = useMfmRender()
  // 画像が読めなかったときは、OS の絵文字で表示する
  const [failed, setFailed] = useState(false)
  const emoji = token?.emoji ?? ''

  if (options.emojiStyle === 'twemoji' && !failed) {
    return (
      <img
        className="emoji twemoji"
        src={`${options.twemojiBase}/${twemojiFileName(emoji)}.svg`}
        alt={emoji}
        title={emoji}
        style={style}
        decoding="async"
        draggable={false}
        onError={() => setFailed(true)}
      />
    )
  }
  return <span style={style}>{emoji}</span>
}
