import { useEffect, useMemo, useState } from 'react'
import { loadNyaize, mfm, shouldNyaize as decideNyaize } from '../core/index.ts'
import { MfmRenderContext } from './context.ts'
import type { MfmRenderState } from './context.ts'
import { MfmComponent } from './Mfm.tsx'
import { MfmProvider } from './MfmProvider.tsx'
import type { MfmProviderProps } from './MfmProvider.tsx'

export type MfmRendererProps = Omit<MfmProviderProps, 'children'> & {
  text: string
  /** 改行を空白にし、テキスト・絵文字・プレーンだけを解析する（ユーザー名など向け） */
  plain?: boolean
  /** 1 行に収め、はみ出たら省略する */
  nowrap?: boolean
  /** 文字の倍率の初期値 */
  rootScale?: number
  /** 'respect' のとき、author.isCat が true ならにゃー化する（Misskey と同じく true ではにゃー化しない） */
  nyaize?: boolean | 'respect'
  /** 投稿者。nyaize の判定に使う */
  author?: { isCat?: boolean | null } | null
  /** false のときは x2〜x4・position・scale を効かせず、アニメーションも止める */
  advancedMfm?: boolean
  /** false のときはアニメーションを止める */
  animatedMfm?: boolean
  /** $[clickable.ev=名前 ...] が押されたら、ev の値を渡して呼ぶ */
  onClickEv?: (ev: string) => void
}

const noop = () => {}

/** 文字列の MFM を描画する（Vue 版の MfmRenderer と同じ） */
export function MfmRenderer({
  text,
  plain = false,
  nowrap = false,
  rootScale = 1,
  nyaize = false,
  author = null,
  advancedMfm = true,
  animatedMfm = true,
  onClickEv = noop,
  emojis,
  domain,
  components
}: MfmRendererProps) {
  const shouldNyaize = decideNyaize(nyaize, author)

  // にゃー化は misskey-js の nyaize を使う。必要になったときだけ読み込む
  const [nyaizeFn, setNyaizeFn] = useState<((text: string) => string) | null>(null)
  useEffect(() => {
    if (!shouldNyaize || nyaizeFn) return
    let cancelled = false
    loadNyaize().then((fn) => {
      if (!cancelled && fn) setNyaizeFn(() => fn)
    })
    return () => {
      cancelled = true
    }
  }, [shouldNyaize, nyaizeFn])

  const state = useMemo<MfmRenderState>(
    () => ({
      options: { plain, nowrap, advancedMfm, animatedMfm, nyaize: shouldNyaize ? nyaizeFn : null },
      scale: rootScale,
      disableNyaize: false,
      onClickEv
    }),
    [plain, nowrap, advancedMfm, animatedMfm, shouldNyaize, nyaizeFn, rootScale, onClickEv]
  )

  const tokens = useMemo(() => mfm(text, plain), [text, plain])

  const body = <MfmComponent tokens={tokens} />
  return (
    <MfmProvider emojis={emojis} domain={domain} components={components}>
      <MfmRenderContext.Provider value={state}>
        {/* nowrap のときだけ Misskey と同じく 1 行に収める。それ以外は包まずに描画する */}
        {nowrap ? <span className="mfm-nowrap">{body}</span> : body}
      </MfmRenderContext.Provider>
    </MfmProvider>
  )
}
