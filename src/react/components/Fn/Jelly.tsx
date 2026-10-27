import type { CSSProperties } from 'react'
import type { MfmFn } from 'mfm-js'
import { validTime } from '../../../core/index.ts'
import { useMfmAnimation } from '../../context.ts'
import type { MfmSyntaxProps } from '../../context.ts'
import { MfmComponent } from '../../Mfm.tsx'

export function Jelly({ token, children, className, style }: MfmSyntaxProps<MfmFn['props']>) {
  // Misskey と同じく、アニメーションを止める設定のときは動かさない
  const useAnim = useMfmAnimation()
  const wrapperStyle: CSSProperties = {
    display: 'inline-block',
    ...(useAnim
      ? {
          animation: `mfm-rubberBand ${validTime(token?.args.speed) ?? '1s'} linear infinite both`,
          animationDelay: validTime(token?.args.delay) ?? '0s'
        }
      : {})
  }
  return (
    <span className={className} style={{ ...wrapperStyle, ...style }}>
      <MfmComponent tokens={children} />
    </span>
  )
}
