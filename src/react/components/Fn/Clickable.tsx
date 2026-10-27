import type { MfmFn } from 'mfm-js'
import { cx, useMfmRender } from '../../context.ts'
import type { MfmSyntaxProps } from '../../context.ts'
import { MfmComponent } from '../../Mfm.tsx'

/** $[clickable.ev=名前 ...] をクリックすると、MfmRenderer の onClickEv に ev の値を渡す */
export function Clickable({ token, children, className, style }: MfmSyntaxProps<MfmFn['props']>) {
  const { onClickEv } = useMfmRender()
  return (
    <span
      className={cx('clickable', className)}
      style={style}
      onClick={(event) => {
        event.stopPropagation()
        event.preventDefault()
        const ev = token?.args.ev
        onClickEv(typeof ev === 'string' ? ev : '')
      }}
    >
      <MfmComponent tokens={children} />
    </span>
  )
}
