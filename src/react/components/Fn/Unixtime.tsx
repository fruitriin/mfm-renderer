import type { MfmFn } from 'mfm-js'
import { cx } from '../../context.ts'
import type { MfmSyntaxProps } from '../../context.ts'

function relativeTime(time: number): string {
  const diff = Date.now() - time
  const abs = Math.abs(diff)
  const suffix = diff < 0 ? '後' : '前'
  if (abs < 60000) return diff < 0 ? 'まもなく' : 'たった今'
  if (abs < 3600000) return `${Math.floor(abs / 60000)}分${suffix}`
  if (abs < 86400000) return `${Math.floor(abs / 3600000)}時間${suffix}`
  if (abs < 2592000000) return `${Math.floor(abs / 86400000)}日${suffix}`
  if (abs < 31536000000) return `${Math.floor(abs / 2592000000)}ヶ月${suffix}`
  return `${Math.floor(abs / 31536000000)}年${suffix}`
}

/** $[unixtime 1700000000]。Misskey と同じく、中身のテキストを Unix 時刻（秒）として「絶対時刻 (相対時間)」で表示する */
export function Unixtime({ children, className, style }: MfmSyntaxProps<MfmFn['props']>) {
  // Misskey は最初の子がテキストのときだけ、その文字列を数値として読む
  const child = children?.[0]
  const time = parseInt(child?.type === 'text' ? child.props.text : '', 10) * 1000
  const isValid = !Number.isNaN(time)
  const absoluteTime = isValid ? new Date(time).toLocaleString() : ''
  return (
    <span className={cx('unixtime', className)} style={style} title={absoluteTime}>
      <i className="ti ti-clock"></i>
      {isValid ? `${absoluteTime} (${relativeTime(time)})` : '無効な日時'}
    </span>
  )
}
