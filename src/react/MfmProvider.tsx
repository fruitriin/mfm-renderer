import { useContext, useMemo } from 'react'
import type { ReactNode } from 'react'
import { MfmEnvironmentContext } from './context.ts'
import type { MfmComponentMap, MfmEmojis } from './context.ts'

export type MfmProviderProps = {
  /** カスタム絵文字。名前から画像の URL を引く */
  emojis?: MfmEmojis
  /** 接続先のサーバー（misskey.io など）。メンションのリンク先とアバターの取得に使う。ないときはアバターを取りに行かない */
  domain?: string | null
  /** 構文ごとのコンポーネントを差し替える。キーは接頭辞なしの名前（Link・X2 など） */
  components?: Partial<MfmComponentMap>
  children?: ReactNode
}

/**
 * 中の MfmRenderer に、絵文字・接続先・差し替えるコンポーネントをまとめて渡す。
 * 外側の MfmProvider で渡したものに、内側で渡したものを重ねる
 */
export function MfmProvider({ emojis, domain, components, children }: MfmProviderProps) {
  const parent = useContext(MfmEnvironmentContext)
  const value = useMemo(
    () => ({
      emojis: emojis ?? parent.emojis,
      domain: domain !== undefined ? domain : parent.domain,
      components: components ? { ...parent.components, ...components } : parent.components
    }),
    [parent, emojis, domain, components]
  )
  return <MfmEnvironmentContext.Provider value={value}>{children}</MfmEnvironmentContext.Provider>
}
