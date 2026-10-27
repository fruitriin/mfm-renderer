import type { CSSProperties } from 'react'
import type { MfmFn } from 'mfm-js'
import { validNumber } from '../../../core/index.ts'
import type { MfmSyntaxProps } from '../../context.ts'
import { MfmComponent } from '../../Mfm.tsx'

export function Rotate({ token, children, className, style }: MfmSyntaxProps<MfmFn['props']>) {
  // Misskey と同じく、数値でない・指定がないときは 90 度とみなす
  const wrapperStyle: CSSProperties = {
    display: 'inline-block',
    transform: `rotate(${validNumber(token?.args.deg) ?? 90}deg)`,
    transformOrigin: 'center center'
  }
  return (
    <span className={className} style={{ ...wrapperStyle, ...style }}>
      <MfmComponent tokens={children} />
    </span>
  )
}
