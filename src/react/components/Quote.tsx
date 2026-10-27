import type { CSSProperties } from 'react'
import { useMfmRender } from '../context.ts'
import type { MfmSyntaxProps } from '../context.ts'
import { MfmComponent } from '../Mfm.tsx'
import { MfmScope } from '../Scope.tsx'

const quoteStyle: CSSProperties = {
  display: 'block',
  margin: '8px',
  padding: '6px 0px 6px 12px',
  color: 'var(--MI_THEME-fg, var(--fg))',
  borderLeft: 'solid 3px var(--MI_THEME-fg, var(--fg))',
  opacity: 0.7
}

export function Quote({ children }: MfmSyntaxProps) {
  const { options } = useMfmRender()
  // nowrap のときは Misskey と同じく span で描画する
  const Tag = options.nowrap ? 'span' : 'div'
  return (
    <Tag className="quote" style={quoteStyle}>
      {/* Misskey と同じく、引用の中はにゃー化しない */}
      <MfmScope disableNyaize>
        <MfmComponent tokens={children} />
      </MfmScope>
    </Tag>
  )
}
