import type { MfmNode } from 'mfm-js'
import { toComponentName } from '../core/index.ts'
import { findComponentMap, useMfmEnvironment } from './context.ts'
import { defaultComponents } from './components/index.ts'

type Props = {
  tokens?: MfmNode[]
}

/**
 * 解析済みの AST を描画する（Vue 版の MfmComponent と同じ）。
 * ノード種別からコンポーネントを決める。bold なら Bold、x2 なら X2 を使う
 */
export function MfmComponent({ tokens }: Props) {
  const { components } = useMfmEnvironment()
  return (
    <>
      {(tokens ?? []).map((token, index) => {
        const name = toComponentName(token.type)
        const Component = findComponentMap(name, components, defaultComponents)?.[name]
        if (Component == null) {
          console.error('unrecognized ast type:', token.type)
          return null
        }
        // AST のノードには安定した ID がないので、位置を key にする（Vue 版と同じ）。text が変わると、同じ位置のコンポーネントの state は引き継がれる。
        // Mention は入力から作った key で前のユーザーのアバターを捨てる。BlockCode は Vue 版と同じく、新しいハイライトができるまで前のものを表示する
        return <Component key={index} token={token.props} children={'children' in token ? token.children : undefined} />
      })}
    </>
  )
}
