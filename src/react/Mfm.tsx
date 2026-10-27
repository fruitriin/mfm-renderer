import type { MfmNode } from 'mfm-js'
import { toComponentName } from '../core/index.ts'
import { useMfmEnvironment } from './context.ts'
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
        const Component = components[name] ?? defaultComponents[name]
        if (Component == null) {
          console.error('unrecognized ast type:', token.type)
          return null
        }
        return <Component key={index} token={token.props} children={'children' in token ? token.children : undefined} />
      })}
    </>
  )
}
