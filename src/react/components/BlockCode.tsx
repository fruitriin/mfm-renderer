import { useEffect, useState } from 'react'
import type { MfmCodeBlock } from 'mfm-js'
import type { MfmSyntaxProps } from '../context.ts'

export function BlockCode({ token }: MfmSyntaxProps<MfmCodeBlock['props']>) {
  const code = token?.code
  const lang = token?.lang
  const [highlighted, setHighlighted] = useState('')
  // 言語の指定がないときはハイライトしない
  const highlightedCode = lang && code ? highlighted : ''

  // code や lang が変わるたびにハイライトし直す
  useEffect(() => {
    let cancelled = false
    if (!lang || !code) return
    // 新しい結果ができるまでは前のハイライトを残し、入力中のちらつきを抑える
    ;(async () => {
      try {
        // shiki は必要になったときだけ読み込む。読み込めない環境ではハイライトせずに表示する
        const { codeToHtml } = await import('shiki')
        const html = await codeToHtml(code, { lang, theme: 'github-dark' })
        // 待っている間に次の入力が来ていたら、古い結果で上書きしない
        if (!cancelled) setHighlighted(html)
      } catch (error) {
        // 言語が認識できない場合はフォールバック
        console.warn('Shiki highlighting failed:', error)
        if (!cancelled) setHighlighted('')
      }
    })()
    return () => {
      cancelled = true
    }
  }, [code, lang])

  if (highlightedCode) {
    return <pre className="block-code" dangerouslySetInnerHTML={{ __html: highlightedCode }} />
  }
  return (
    <pre className="block-code">
      <code>{code}</code>
    </pre>
  )
}
