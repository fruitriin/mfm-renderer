import type { CSSProperties } from 'react'
import type { MfmFn } from 'mfm-js'
import { validColor } from '../../../core/index.ts'
import type { MfmSyntaxProps } from '../../context.ts'
import { MfmComponent } from '../../Mfm.tsx'

export function Bg({ token, children, className, style }: MfmSyntaxProps<MfmFn['props']>) {
  // Misskey と同じく、色が正しくないときは赤にする
  const wrapperStyle: CSSProperties = {
    display: 'inline-block',
    backgroundColor: `#${validColor(token?.args.color) ?? 'f00'}`,
    overflowWrap: 'anywhere'
  }
  return (
    <span className={className} style={{ ...wrapperStyle, ...style }}>
      <MfmComponent tokens={children} />
    </span>
  )
}
