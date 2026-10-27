import type { MfmLink } from 'mfm-js'
import { cx } from '../context.ts'
import type { MfmSyntaxProps } from '../context.ts'
import { MfmComponent } from '../Mfm.tsx'
import { MfmScope } from '../Scope.tsx'

export function Link({ token, children, className, style }: MfmSyntaxProps<MfmLink['props']>) {
  return (
    <a className={cx('link', className)} href={token?.url} style={style}>
      {/* Misskey と同じく、リンクの表示テキストはにゃー化しない */}
      <MfmScope disableNyaize>
        <MfmComponent tokens={children} />
      </MfmScope>
    </a>
  )
}
