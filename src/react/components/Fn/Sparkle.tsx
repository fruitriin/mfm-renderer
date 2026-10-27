/*
 * Sparkle MFM Effect Component
 *
 * Based on Misskey's MkSparkle.vue implementation
 * Original source: https://github.com/misskey-dev/misskey
 *
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import type { CSSProperties } from 'react'
import type { MfmFn } from 'mfm-js'
import { validTime } from '../../../core/index.ts'
import { cx, useMfmAnimation } from '../../context.ts'
import type { MfmSyntaxProps } from '../../context.ts'
import { MfmComponent } from '../../Mfm.tsx'

const particlePath =
  'M197.58 129.06l-51.61-19-19-51.65a15.92 15.92 0 0 0-29.88 0L78.07 110l-51.65 19a15.92 15.92 0 0 0 0 29.88L78 178l19 51.62a15.92 15.92 0 0 0 29.88 0l19-51.61 51.65-19a15.92 15.92 0 0 0 0-29.88Z'

export function Sparkle({ token, children, className, style }: MfmSyntaxProps<MfmFn['props']>) {
  const useAnim = useMfmAnimation()
  // Misskey と同じく、アニメーションを止める設定のときは中身だけを表示する
  if (!useAnim) return <MfmComponent tokens={children} />

  const speed = validTime(token?.args.speed) ?? '1s'
  const delay = validTime(token?.args.delay) ?? '0s'
  const animation = `mfm-sparkle ${speed} linear infinite`
  // 中身の周りに置く粒
  const particles: CSSProperties[] = [
    { top: '-0.5em', left: '-0.5em', animation, animationDelay: delay, color: '#eb6f92' },
    { top: '-0.5em', right: '-0.5em', animation, animationDelay: `calc(${delay} + ${speed} / 3)`, color: '#f6c177' },
    {
      bottom: '-0.5em',
      left: '50%',
      marginLeft: '-0.5em',
      animation,
      animationDelay: `calc(${delay} + ${speed} * 2 / 3)`,
      color: '#9ccfd8'
    }
  ]

  return (
    <span className={cx('mfm-sparkle', className)} style={{ position: 'relative', display: 'inline-block', ...style }}>
      <MfmComponent tokens={children} />
      {particles.map((particleStyle, index) => (
        <svg key={index} className="mfm-sparkle-particle" style={particleStyle} viewBox="0 0 256 256" aria-hidden="true">
          <path fill="currentColor" d={particlePath} />
        </svg>
      ))}
    </span>
  )
}
