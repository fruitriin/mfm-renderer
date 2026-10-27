import type { CSSProperties } from 'react'
import type { MfmFn } from 'mfm-js'
import { validTime } from '../../../core/index.ts'
import { useMfmAnimation } from '../../context.ts'
import type { MfmSyntaxProps } from '../../context.ts'
import { MfmComponent } from '../../Mfm.tsx'

export function Spin({ token, children, className, style }: MfmSyntaxProps<MfmFn['props']>) {
  // Misskey と同じく、アニメーションを止める設定のときは動かさない
  const useAnim = useMfmAnimation()
  const args = token?.args ?? {}
  // x・y で回転の軸を、left・alternate で向きを変える
  const name = args.x ? 'mfm-spinX' : args.y ? 'mfm-spinY' : 'mfm-spin'
  const direction = args.left ? 'reverse' : args.alternate ? 'alternate' : 'normal'
  const wrapperStyle: CSSProperties = useAnim
    ? {
        display: 'inline-block',
        animation: `${name} ${validTime(args.speed) ?? '1.5s'} linear infinite`,
        animationDirection: direction,
        animationDelay: validTime(args.delay) ?? '0s'
      }
    : { display: 'inline-block' }
  return (
    <span className={className} style={{ ...wrapperStyle, ...style }}>
      <MfmComponent tokens={children} />
    </span>
  )
}
