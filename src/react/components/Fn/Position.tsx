import type { MfmFn } from 'mfm-js'
import { validNumber } from '../../../core/index.ts'
import { useMfmRender } from '../../context.ts'
import type { MfmSyntaxProps } from '../../context.ts'
import { MfmComponent } from '../../Mfm.tsx'
import { FnRaw } from '../Fn.tsx'

export function Position(props: MfmSyntaxProps<MfmFn['props']>) {
  const { token, children, className, style } = props
  const { options } = useMfmRender()
  // Misskey と同じく、高度な MFM を止める設定のときは $[position ...] のまま表示する
  if (!options.advancedMfm) return <FnRaw {...props} />
  // Misskey と同じく、数値でない・指定がないほうは 0 とみなす
  const x = validNumber(token?.args.x) ?? 0
  const y = validNumber(token?.args.y) ?? 0
  return (
    <span className={className} style={{ display: 'inline-block', transform: `translateX(${x}em) translateY(${y}em)`, ...style }}>
      <MfmComponent tokens={children} />
    </span>
  )
}
