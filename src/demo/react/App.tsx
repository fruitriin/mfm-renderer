import { useEffect, useState } from 'react'
import { mfm } from '../../core/index.ts'
import { MfmProvider, MfmRenderer } from '../../react/index.ts'
import type { MfmEmojis } from '../../react/index.ts'
import { loadEmojis } from '../emojis.ts'
import { samples as baseSamples } from '../samples.ts'

const initialText = `#mfmart @mention :110:
      **太字** <i>斜め</i> ~~打ち消し~~
\`inline code (JavaScript highlight)\`
> 引用
>> 引用の引用`

/** React 版のプレビュー。Vue 版のプレビュー（src/App.vue）と同じ画面にする */
export function App() {
  const [ast, setAst] = useState(false)
  const [domainInput, setDomainInput] = useState('misskey.systems')
  const [domain, setDomain] = useState('misskey.systems')
  const [isCat, setIsCat] = useState(false)
  const [advancedMfm, setAdvancedMfm] = useState(true)
  const [animatedMfm, setAnimatedMfm] = useState(true)
  const [plain, setPlain] = useState(false)
  const [nowrap, setNowrap] = useState(false)
  const [text, setText] = useState(initialText)
  const [samples, setSamples] = useState(baseSamples)
  const [emojis, setEmojis] = useState<MfmEmojis>({})

  useEffect(() => {
    loadEmojis(domain).then(setEmojis)
  }, [domain])

  // MfmRenderer の描画オプションを切り替えて確かめる
  const rendererOptions = {
    nyaize: 'respect' as const,
    author: { isCat },
    advancedMfm,
    animatedMfm,
    plain,
    nowrap,
    onClickEv: (ev: string) => console.log('clickEv:', ev)
  }

  return (
    <MfmProvider emojis={emojis} domain={domain}>
      <h1>MFM Renderer（React 版）</h1>
      <div style={{ position: 'fixed', right: 0, top: 0, background: 'wheat' }}>
        モード
        <Check label="AST" checked={ast} onChange={setAst} />
        <div>
          {/* Vue 版の v-model.lazy と同じく、入力を終えたときに反映する */}
          <input value={domainInput} onChange={(event) => setDomainInput(event.target.value)} onBlur={() => setDomain(domainInput)} />
        </div>
        <Check label="にゃあああああああ！（nyaize）" checked={isCat} onChange={setIsCat} />
        <Check label="高度な MFM" checked={advancedMfm} onChange={setAdvancedMfm} />
        <Check label="アニメーション" checked={animatedMfm} onChange={setAnimatedMfm} disabled={!advancedMfm} />
        <Check label="plain" checked={plain} onChange={setPlain} />
        <Check label="nowrap" checked={nowrap} onChange={setNowrap} />
      </div>
      <hr />
      <div style={{ display: 'flex' }}>
        <div style={{ width: '50%', padding: 8 }}>
          <MfmRenderer text={text} {...rendererOptions} />
        </div>
        <div style={{ width: '50%', padding: 8 }}>
          <textarea value={text} onChange={(event) => setText(event.target.value)} style={{ height: '6rem', width: '100%' }} />
        </div>
      </div>

      <hr />
      <h2>テストコード</h2>
      {samples.map((sample, index) => (
        <div style={{ display: 'flex' }} key={index}>
          <div style={{ width: '50%', padding: 8 }}>
            <h4>Parsed MFM: ({sample.title})</h4>
            <hr />
            <MfmRenderer text={sample.body} {...rendererOptions} />
            {ast && <pre>{JSON.stringify(mfm(sample.body, false), null, 2)}</pre>}
            <hr />
          </div>
          <div style={{ width: '50%', padding: 8 }}>
            <h4>元テキスト</h4>
            <textarea
              value={sample.body}
              onChange={(event) =>
                setSamples(samples.map((s, i) => (i === index ? { ...s, body: event.target.value } : s)))
              }
              style={{ height: '6rem', width: '100%' }}
            />
          </div>
        </div>
      ))}
    </MfmProvider>
  )
}

type CheckProps = {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
}

function Check({ label, checked, onChange, disabled }: CheckProps) {
  return (
    <div>
      <label>
        <input type="checkbox" checked={checked} disabled={disabled} onChange={(event) => onChange(event.target.checked)} /> {label}
      </label>
    </div>
  )
}
