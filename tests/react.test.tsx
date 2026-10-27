import { afterEach, describe, expect, it, vi } from 'vitest'
import { act } from 'react'
import { createRoot } from 'react-dom/client'
import type { Root } from 'react-dom/client'
import type { ReactNode } from 'react'
import { flushPromises, mount } from '@vue/test-utils'
import MfmPlugin from '../src/library.ts'
import VueMfmRenderer from '../src/components/MfmRenderer.vue'
import { MfmProvider, MfmRenderer } from '../src/react/index.ts'
import type { MfmRendererProps } from '../src/react/index.ts'
import { fnFixtures, syntaxFixtures } from './fixtures.ts'
import { normalizeHtml } from './normalizeHtml.ts'

// コードのハイライトは shiki の読み込みに時間がかかるので、決まった HTML を返すものに差し替える
vi.mock('shiki', () => ({
  codeToHtml: async (code: string, options: { lang: string }) =>
    `<pre class="shiki" data-lang="${options.lang}"><code>${code}</code></pre>`
}))

// act を使うことを React に伝える
;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

const roots: Root[] = []

async function renderReact(node: ReactNode): Promise<HTMLElement> {
  const container = document.createElement('div')
  document.body.appendChild(container)
  const root = createRoot(container)
  roots.push(root)
  await act(async () => {
    root.render(node)
  })
  // 非同期の読み込み（にゃー化・ハイライト）が終わるのを待つ
  await act(async () => {
    await vi.dynamicImportSettled()
    await flushPromises()
  })
  return container
}

async function renderVue(props: Record<string, unknown>, provide: Record<string, unknown> = {}): Promise<string> {
  const wrapper = mount(VueMfmRenderer, { props: props as never, global: { plugins: [MfmPlugin], provide } })
  await vi.dynamicImportSettled()
  await flushPromises()
  return normalizeHtml(wrapper.html({ raw: true }))
}

afterEach(() => {
  act(() => roots.splice(0).forEach((root) => root.unmount()))
  document.body.innerHTML = ''
  vi.unstubAllGlobals()
  vi.useRealTimers()
})

// React 版は、同じ入力で Vue 版と同じ HTML を出力する
describe('Vue 版と同じ出力になる', () => {
  const cases: { name: string; props: Omit<MfmRendererProps, 'text'> & { text: string } }[] = [
    ...syntaxFixtures.map(({ name, text }) => ({ name, props: { text } })),
    ...fnFixtures.map(({ name, text }) => ({ name, props: { text } })),
    { name: 'plain', props: { text: '**太字**\n2 行目 :pudding:', plain: true } },
    { name: 'nowrap', props: { text: '> 引用\n本文', nowrap: true } },
    { name: 'advancedMfm が false', props: { text: '$[x2 大] $[position.x=1 移動] $[scale.x=2 拡大] $[spin 🍮]', advancedMfm: false } },
    { name: 'animatedMfm が false', props: { text: '$[spin 🍮] $[rainbow 虹] $[sparkle 🍮] $[tada 🍮]', animatedMfm: false } },
    { name: 'rootScale', props: { text: '$[x2 :pudding:]', rootScale: 1.5 } },
    { name: 'scale と絵文字', props: { text: '$[scale.x=3 :pudding:] $[x3 :pudding:]' } },
    {
      name: 'にゃー化',
      props: { text: 'なにかな\n> なにかな\n[なにかな](https://example.com)\n$[ruby なにかな なな]', nyaize: 'respect', author: { isCat: true } }
    },
    { name: '言語付きのコードブロック', props: { text: '```js\nconst a = 1\n```' } }
  ]
  const emojis = { pudding: { url: 'https://example.com/pudding.png' } }

  it.each(cases)('$name', async ({ props }) => {
    const { text, ...rest } = props
    const vue = await renderVue({ text, ...rest }, { emojis })
    const container = await renderReact(<MfmRenderer text={text} emojis={emojis} {...rest} />)
    expect(vue).not.toBe('')
    expect(normalizeHtml(container.innerHTML)).toBe(vue)
  })

  it('$[unixtime]', async () => {
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(new Date((1700000000 + 3 * 3600) * 1000))
    const text = '$[unixtime 1700000000] $[unixtime abc]'
    const vue = await renderVue({ text })
    const container = await renderReact(<MfmRenderer text={text} />)
    expect(normalizeHtml(container.innerHTML)).toBe(vue)
  })
})

describe('React 版だけの使い方', () => {
  it('onClickEv に $[clickable] の ev の値を渡す', async () => {
    const onClickEv = vi.fn()
    const container = await renderReact(<MfmRenderer text="$[clickable.ev=hello 押す]" onClickEv={onClickEv} />)
    await act(async () => {
      container.querySelector<HTMLElement>('.clickable')?.click()
    })
    expect(onClickEv).toHaveBeenCalledWith('hello')
  })

  it('MfmProvider で渡した emojis と domain を使い、MfmRenderer の props で上書きできる', async () => {
    const fetchMock = vi.fn(async () => ({ ok: true, json: async () => ({ avatarUrl: 'https://a.example/avatar.png' }) }))
    vi.stubGlobal('fetch', fetchMock)
    const container = await renderReact(
      <MfmProvider emojis={{ pudding: { url: 'https://example.com/pudding.png' } }} domain="a.example">
        <MfmRenderer text=":pudding: @alice@remote.example" />
        <MfmRenderer text=":pudding:" emojis={{ pudding: { url: 'https://example.com/other.png' } }} />
      </MfmProvider>
    )
    const images = container.querySelectorAll<HTMLImageElement>('img.emoji')
    expect(images[0].getAttribute('src')).toBe('https://example.com/pudding.png')
    expect(images[1].getAttribute('src')).toBe('https://example.com/other.png')
    expect(fetchMock).toHaveBeenCalledWith('https://a.example/api/users/show', expect.anything())
    expect(container.querySelector('a.mention')?.getAttribute('href')).toBe('https://a.example/@alice@remote.example')
    expect(container.querySelector('img.avatar')?.getAttribute('src')).toBe('https://a.example/avatar.png')
  })

  it('components で構文ごとのコンポーネントを差し替えられる', async () => {
    const MyLink = ({ token }: { token?: { url: string } }) => <span className="my-link">{token?.url}</span>
    const container = await renderReact(<MfmRenderer text="[リンク](https://example.com) $[x2 大]" components={{ Link: MyLink }} />)
    expect(container.querySelector('.my-link')?.textContent).toBe('https://example.com')
    expect(container.querySelector('.mfm-x2')).not.toBeNull()
  })

  it('components に関数を足すと、その $[...] を描画できる', async () => {
    const Shout = ({ children }: { children?: unknown[] }) => <strong className="shout">{children?.length}</strong>
    const container = await renderReact(<MfmRenderer text="$[shout 大声] $[unknown 未対応]" components={{ Shout }} />)
    expect(container.querySelector('.shout')).not.toBeNull()
    expect(container.textContent).toContain('$[unknown 未対応]')
  })
})
