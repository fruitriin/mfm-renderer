import type { MfmFn } from 'mfm-js'
import { toComponentName } from '../../core/index.ts'
import { cx, findComponentMap, useMfmEnvironment } from '../context.ts'
import type { MfmSyntaxProps } from '../context.ts'
import { MfmComponent } from '../Mfm.tsx'
import { defaultComponents } from './index.ts'

/** $[name ...] の関数。関数名から Fn/ のコンポーネントを決める（$[x2 ...] なら X2） */
export function Fn({ token, children, className, style }: MfmSyntaxProps<MfmFn['props']>) {
  const { components } = useMfmEnvironment()
  const name = toComponentName(token?.name ?? '')
  const Component = findComponentMap(name, components, defaultComponents)?.[name]
  // 未対応の関数は Misskey と同じく $[name ...] の形のまま表示する
  if (Component == null) return <FnRaw token={token} children={children} className={cx('Fn', className)} style={style} />
  return <Component token={token} children={children} className={cx('Fn', token?.name, className)} style={style} />
}

/** $[name 中身] の形のまま表示する */
export function FnRaw({ token, children, className, style }: MfmSyntaxProps<MfmFn['props']>) {
  return (
    <span className={className} style={style}>
      $[{token?.name} <MfmComponent tokens={children} />]
    </span>
  )
}
