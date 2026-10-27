import type { CSSProperties } from 'react'
import type { MfmFn } from 'mfm-js'
import { validTime } from '../../../core/index.ts'
import { useMfmAnimation } from '../../context.ts'
import type { MfmSyntaxProps } from '../../context.ts'
import { MfmComponent } from '../../Mfm.tsx'

export function Bounce({ token, children, className, style }: MfmSyntaxProps<MfmFn['props']>) {
  // Misskey と同じく、アニメーションを止める設定のときは動かさない
  const useAnim = useMfmAnimation()
  const wrapperStyle: CSSProperties = {
    display: 'inline-block',
    ...(useAnim
      ? {
          animation: `mfm-bounce ${validTime(token?.args.speed) ?? '0.75s'} linear infinite`,
          animationDelay: validTime(token?.args.delay) ?? '0s',
          transformOrigin: 'center bottom'
        }
      : {})
  }
  return (
    <span className={className} style={{ ...wrapperStyle, ...style }}>
      <MfmComponent tokens={children} />
    </span>
  )
}
