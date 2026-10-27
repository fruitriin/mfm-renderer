import type { MfmFn } from 'mfm-js'
import { cx, useMfmRender } from '../../context.ts'
import type { MfmSyntaxProps } from '../../context.ts'
import { MfmComponent } from '../../Mfm.tsx'
import { MfmScope } from '../../Scope.tsx'

/** 大きさは mfm.css の mfm-x4 で決める。入れ子にすると効きが弱くなる（Misskey と同じ） */
export function X4({ children, className, style }: MfmSyntaxProps<MfmFn['props']>) {
  const { options, scale } = useMfmRender()
  return (
    // Misskey と同じく、高度な MFM を止める設定のときは大きくしない
    <span className={cx(options.advancedMfm && 'mfm-x4', className)} style={style}>
      {/* 倍率は高度な MFM の設定にかかわらず掛け合わせる（Misskey と同じ） */}
      <MfmScope scale={scale * 4}>
        <MfmComponent tokens={children} />
      </MfmScope>
    </span>
  )
}
