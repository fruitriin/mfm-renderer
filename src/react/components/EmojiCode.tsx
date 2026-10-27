import type { MfmEmojiCode } from 'mfm-js'
import { cx, useMfmEnvironment, useMfmRender } from '../context.ts'
import type { MfmSyntaxProps } from '../context.ts'

export function EmojiCode({ token }: MfmSyntaxProps<MfmEmojiCode['props']>) {
  const { emojis } = useMfmEnvironment()
  const { options, scale } = useMfmRender()
  const name = token?.name ?? ''
  const emoji = emojis[name]
  if (!emoji) return <span>:{name}:</span>
  // Misskey は倍率が 2.5 以上のとき、縮小版ではなく元の画像を使う（useOriginalSize）。
  // このレンダラーは常に元の画像を使うので、利用側がスタイルを当てられるよう class だけ付ける
  return <img src={emoji.url} className={cx('emoji', options.plain && 'normal', scale >= 2.5 && 'original-size')} />
}
