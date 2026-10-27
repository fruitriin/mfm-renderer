import type { CSSProperties } from 'react'
import type { MfmFn } from 'mfm-js'
import { validNumber } from '../../../core/index.ts'
import { useMfmRender } from '../../context.ts'
import type { MfmSyntaxProps } from '../../context.ts'
import { MfmComponent } from '../../Mfm.tsx'
import { MfmScope } from '../../Scope.tsx'

export function Scale({ token, children, className, style }: MfmSyntaxProps<MfmFn['props']>) {
  const { options, scale } = useMfmRender()
  // Misskey と同じく、どちらの向きも 5 倍までにする
  const x = Math.min(validNumber(token?.args.x) ?? 1, 5)
  const y = Math.min(validNumber(token?.args.y) ?? 1, 5)
  // Misskey と同じく、高度な MFM を止める設定のときは拡大縮小しない
  const wrapperStyle: CSSProperties = options.advancedMfm
    ? { display: 'inline-block', transform: `scale(${x}, ${y})` }
    : { display: 'inline-block' }
  return (
    <span className={className} style={{ ...wrapperStyle, ...style }}>
      {/* Misskey と同じく、拡大縮小するときだけ倍率に大きいほうを掛ける */}
      <MfmScope scale={options.advancedMfm ? scale * Math.max(x, y) : scale}>
        <MfmComponent tokens={children} />
      </MfmScope>
    </span>
  )
}
