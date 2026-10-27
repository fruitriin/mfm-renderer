import type { CSSProperties } from 'react'
import type { MfmFn } from 'mfm-js'
import { validTime } from '../../../core/index.ts'
import { cx, useMfmAnimation } from '../../context.ts'
import type { MfmSyntaxProps } from '../../context.ts'
import { MfmComponent } from '../../Mfm.tsx'

export function Rainbow({ token, children, className, style }: MfmSyntaxProps<MfmFn['props']>) {
  const useAnim = useMfmAnimation()
  // Misskey と同じく、アニメーションを止める設定のときは静的な虹色にする
  if (!useAnim) {
    return (
      <span className={cx('mfm-rainbow-fallback', className)} style={style}>
        <MfmComponent tokens={children} />
      </span>
    )
  }
  const wrapperStyle: CSSProperties = {
    display: 'inline-block',
    animation: `mfm-rainbow ${validTime(token?.args.speed) ?? '1s'} linear infinite`,
    animationDelay: validTime(token?.args.delay) ?? '0s'
  }
  return (
    <span className={className} style={{ ...wrapperStyle, ...style }}>
      <MfmComponent tokens={children} />
    </span>
  )
}
