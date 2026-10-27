import type { CSSProperties } from 'react'
import type { MfmFn } from 'mfm-js'
import { validBorderStyle, validColor, validNumber } from '../../../core/index.ts'
import type { MfmSyntaxProps } from '../../context.ts'
import { MfmComponent } from '../../Mfm.tsx'

export function Border({ token, children, className, style }: MfmSyntaxProps<MfmFn['props']>) {
  const args = token?.args ?? {}
  const color = validColor(args.color)
  const borderStyle = validBorderStyle(args.style) ?? 'solid'
  const width = validNumber(args.width) ?? 1
  const radius = validNumber(args.radius) ?? 0
  const wrapperStyle: CSSProperties = {
    display: 'inline-block',
    border: `${width}px ${borderStyle} ${color ? `#${color}` : 'var(--MI_THEME-accent, var(--accent))'}`,
    borderRadius: `${radius}px`,
    // noclip を付けないときは、はみ出た中身を切り取る
    ...(args.noclip ? {} : { overflow: 'clip' })
  }
  return (
    <span className={className} style={{ ...wrapperStyle, ...style }}>
      <MfmComponent tokens={children} />
    </span>
  )
}
