import type { CSSProperties } from 'react'
import type { MfmFn } from 'mfm-js'
import type { MfmSyntaxProps } from '../../context.ts'
import { MfmComponent } from '../../Mfm.tsx'

export function Flip({ token, children, className, style }: MfmSyntaxProps<MfmFn['props']>) {
  // Misskey と同じく、引数なしと h は左右、v は上下、h,v は上下左右に反転する
  const args = token?.args ?? {}
  const transform = args.h && args.v ? 'scale(-1, -1)' : args.v ? 'scaleY(-1)' : 'scaleX(-1)'
  const wrapperStyle: CSSProperties = { display: 'inline-block', transform }
  return (
    <span className={className} style={{ ...wrapperStyle, ...style }}>
      <MfmComponent tokens={children} />
    </span>
  )
}
