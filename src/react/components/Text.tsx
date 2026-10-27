import { Fragment } from 'react'
import type { MfmText } from 'mfm-js'
import { cx, useMfmNyaize, useMfmRender } from '../context.ts'
import type { MfmSyntaxProps } from '../context.ts'

export function Text({ token, className, style }: MfmSyntaxProps<MfmText['props']>) {
  const { options } = useMfmRender()
  const nyaize = useMfmNyaize()
  const text = nyaize(token?.text ?? '')
  // plain のときは改行を空白にする。それ以外は行ごとに分けて <br> を挟む
  const lines = options.plain ? [text.replace(/\r\n|\n|\r/g, ' ')] : text.split(/\r\n|\n|\r/)
  return (
    <>
      {lines.map((line, index) => (
        <Fragment key={index}>
          <span className={cx('text', className)} style={style}>
            {line}
          </span>
          {index + 1 < lines.length && <br />}
        </Fragment>
      ))}
    </>
  )
}
