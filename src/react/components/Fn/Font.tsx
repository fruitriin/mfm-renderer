import type { MfmFn } from 'mfm-js'
import type { MfmSyntaxProps } from '../../context.ts'
import { MfmComponent } from '../../Mfm.tsx'
import { FnRaw } from '../Fn.tsx'

function fontFamily(args: MfmFn['props']['args']): string | null {
  if (args.serif) return 'serif'
  if (args.monospace) return 'monospace'
  if (args.cursive) return 'cursive'
  if (args.fantasy) return 'fantasy'
  if (args.emoji) return 'emoji'
  if (args.math) return 'math'
  return null
}

export function Font(props: MfmSyntaxProps<MfmFn['props']>) {
  const { token, children, className, style } = props
  const family = fontFamily(token?.args ?? {})
  // Misskey と同じく、フォントの指定がないときは $[font ...] のまま表示する
  if (family == null) return <FnRaw {...props} />
  return (
    <span className={className} style={{ display: 'inline-block', fontFamily: family, ...style }}>
      <MfmComponent tokens={children} />
    </span>
  )
}
