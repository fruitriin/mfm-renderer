import { useMemo } from 'react'
import type { ReactNode } from 'react'
import { MfmRenderContext, useMfmRender } from './context.ts'

type Props = {
  /** 中の文字の倍率。指定しなければ外側と同じ */
  scale?: number
  /** true にすると中ではにゃー化しない */
  disableNyaize?: boolean
  children?: ReactNode
}

/** 中で描画する構文に、倍率やにゃー化の有無を伝える（Vue 版で provide しているもの） */
export function MfmScope({ scale, disableNyaize, children }: Props) {
  const parent = useMfmRender()
  const value = useMemo(
    () => ({
      ...parent,
      scale: scale ?? parent.scale,
      disableNyaize: disableNyaize ?? parent.disableNyaize
    }),
    [parent, scale, disableNyaize]
  )
  return <MfmRenderContext.Provider value={value}>{children}</MfmRenderContext.Provider>
}
