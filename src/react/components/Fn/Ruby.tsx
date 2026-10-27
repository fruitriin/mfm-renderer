import type { MfmFn } from 'mfm-js'
import { useMfmNyaize } from '../../context.ts'
import type { MfmSyntaxProps } from '../../context.ts'
import { MfmComponent } from '../../Mfm.tsx'

/** 中身がテキスト 1 つなら「本文 ルビ」と空白で分ける。それ以外は最後のテキストをルビにする（Misskey と同じ） */
export function Ruby({ children = [], className, style }: MfmSyntaxProps<MfmFn['props']>) {
  const nyaize = useMfmNyaize()
  if (children.length === 1) {
    const child = children[0]
    // Misskey と同じく、本文とルビをまとめてにゃー化してから分ける
    const parts = nyaize(child.type === 'text' ? child.props.text : '').split(' ')
    return (
      <ruby className={className} style={style}>
        {parts[0] ?? ''}
        <rt>{parts[1] ?? ''}</rt>
      </ruby>
    )
  }
  const last = children[children.length - 1]
  const lastText = nyaize(last?.type === 'text' ? last.props.text : '').trim()
  return (
    <ruby className={className} style={style}>
      <MfmComponent tokens={children.slice(0, -1)} />
      <rt>{lastText}</rt>
    </ruby>
  )
}
