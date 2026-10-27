/**
 * React 版のエントリーポイント（mfm-renderer/react）
 *
 * import { MfmRenderer } from 'mfm-renderer/react'
 * import 'mfm-renderer/react/style.css'
 */
import '../mfm.css'
import './style.css'

export { MfmRenderer } from './MfmRenderer.tsx'
export type { MfmRendererProps } from './MfmRenderer.tsx'
export { MfmProvider } from './MfmProvider.tsx'
export type { MfmProviderProps } from './MfmProvider.tsx'
export { MfmComponent } from './Mfm.tsx'
export type { MfmComponentMap, MfmEmojis, MfmSyntaxProps } from './context.ts'
// 構文ごとのコンポーネント。Vue 版の登録名と同じく Mfm 接頭辞を付ける（MfmBold・MfmX2 など）
export * from './components/index.ts'
