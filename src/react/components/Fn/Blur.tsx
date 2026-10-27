import type { MfmFn } from 'mfm-js'
import { cx } from '../../context.ts'
import type { MfmSyntaxProps } from '../../context.ts'
import { MfmComponent } from '../../Mfm.tsx'

/** ぼかしは mfm.css の mfm-blur で付ける。マウスを載せると見える */
export function Blur({ children, className, style }: MfmSyntaxProps<MfmFn['props']>) {
  return (
    <span className={cx('mfm-blur', className)} style={style}>
      <MfmComponent tokens={children} />
    </span>
  )
}
