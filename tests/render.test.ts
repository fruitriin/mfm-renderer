import { readFileSync } from 'node:fs'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import MfmPlugin from '../src/library.ts'
import MfmRenderer from '../src/components/MfmRenderer.vue'
import { fnFixtures, syntaxFixtures } from './fixtures.ts'
import { normalizeHtml } from './normalizeHtml.ts'

// コードのハイライトは shiki の読み込みに時間がかかるので、決まった HTML を返すものに差し替える
vi.mock('shiki', () => ({
  codeToHtml: async (code: string, options: { lang: string }) =>
    `<pre class="shiki" data-lang="${options.lang}"><code>${code}</code></pre>`
}))

type RendererProps = InstanceType<typeof MfmRenderer>['$props']

function render(props: RendererProps, provide: Record<string, unknown> = {}) {
  return mount(MfmRenderer, {
    props,
    global: { plugins: [MfmPlugin], provide }
  })
}

afterEach(() => {
  vi.unstubAllGlobals()
  vi.useRealTimers()
})

// 今の Vue 版の出力を記録しておく。React 版はこの出力と同じになることを目指す
describe('構文ごとの出力', () => {
  it.each(syntaxFixtures)('$name', async ({ text }) => {
    const wrapper = render({ text })
    await flushPromises()
    expect(normalizeHtml(wrapper.html({ raw: true }))).toMatchSnapshot()
  })
})

describe('関数（$[...]）ごとの出力', () => {
  it.each(fnFixtures)('$name', async ({ text }) => {
    const wrapper = render({ text })
    await flushPromises()
    expect(normalizeHtml(wrapper.html({ raw: true }))).toMatchSnapshot()
  })
})

describe('MfmRenderer の props', () => {
  it('plain のときは改行を空白にし、太字などを解析しない', () => {
    const wrapper = render({ text: '**太字**\n2 行目', plain: true })
    expect(wrapper.find('b').exists()).toBe(false)
    expect(wrapper.find('br').exists()).toBe(false)
    expect(wrapper.text()).toBe('**太字** 2 行目')
  })

  it('nowrap のときは 1 行に収める要素で包む', () => {
    expect(render({ text: 'a' }).find('.mfm-nowrap').exists()).toBe(false)
    expect(render({ text: 'a', nowrap: true }).find('.mfm-nowrap').exists()).toBe(true)
  })

  it('advancedMfm が false のときは x2・scale で大きくせず、position は $[position ...] のまま表示する', () => {
    const on = render({ text: '$[x2 大]' })
    const off = render({ text: '$[x2 大]', advancedMfm: false })
    expect(on.find('.mfm-x2').exists()).toBe(true)
    expect(off.find('.mfm-x2').exists()).toBe(false)
    expect(render({ text: '$[position.x=1 移動]', advancedMfm: false }).text()).toBe('$[position 移動]')
    expect(render({ text: '$[scale.x=2 拡大]' }).html()).toContain('scale(2, 1)')
    expect(render({ text: '$[scale.x=2 拡大]', advancedMfm: false }).html()).not.toContain('scale(')
  })

  it('animatedMfm が false のときはアニメーションを付けない', () => {
    const on = render({ text: '$[spin 🍮]' })
    const off = render({ text: '$[spin 🍮]', animatedMfm: false })
    expect(on.html()).toContain('animation')
    expect(off.html()).not.toContain('animation')
    // rainbow は Misskey と同じく、動かない虹色の class にする
    const rainbow = render({ text: '$[rainbow 虹]', animatedMfm: false })
    expect(rainbow.find('.mfm-rainbow-fallback').exists()).toBe(true)
    expect(rainbow.html()).not.toContain('animation')
  })

  // アニメーションのある関数。sparkle は粒の svg に animation を付ける
  const animatedFns = ['spin', 'spin.x', 'spin.y', 'jump', 'bounce', 'shake', 'twitch', 'tada', 'jelly', 'rainbow', 'sparkle']

  it('animatedMfm が false のときは、どの関数にもアニメーションを付けない', () => {
    for (const name of animatedFns) {
      expect(render({ text: `$[${name} 字]`, animatedMfm: false }).html(), name).not.toContain('animation')
    }
    // tada は Misskey と同じく、大きさだけ残す
    expect(render({ text: '$[tada 字]', animatedMfm: false }).html()).toContain('font-size: 150%')
  })

  it('advancedMfm が false のときは、アニメーション・x2〜x4・position・scale を効かせない', () => {
    for (const name of animatedFns) {
      expect(render({ text: `$[${name} 字]`, advancedMfm: false }).html(), name).not.toContain('animation')
    }
    for (const name of ['x2', 'x3', 'x4']) {
      expect(render({ text: `$[${name} 字]`, advancedMfm: false }).find(`.mfm-${name}`).exists(), name).toBe(false)
    }
  })

  it('関数が使う animation の名前は、すべて mfm.css に keyframes として定義されている', () => {
    const css = readFileSync('src/mfm.css', 'utf8') // テストはリポジトリの直下で実行する
    const defined = new Set([...css.matchAll(/@keyframes ([\w-]+)/g)].map((m) => m[1]))
    const used = new Set<string>()
    for (const name of animatedFns) {
      const html = render({ text: `$[${name} 字]` }).html()
      for (const m of html.matchAll(/animation: ([\w-]+)/g)) used.add(m[1])
    }
    expect(used.size).toBeGreaterThanOrEqual(11)
    for (const name of used) expect(defined, name).toContain(name)
  })

  it('rootScale と x2〜x4 を掛けて 2.5 以上になった絵文字に original-size を付ける', () => {
    const emojis = { pudding: { url: 'https://example.com/pudding.png' } }
    const small = render({ text: '$[x2 :pudding:]' }, { emojis })
    const large = render({ text: '$[x2 :pudding:]', rootScale: 1.5 }, { emojis })
    expect(small.find('img.emoji').classes()).not.toContain('original-size')
    expect(large.find('img.emoji').classes()).toContain('original-size')
  })

  it("nyaize が 'respect' で猫のユーザーならにゃー化し、引用とリンクの中はにゃー化しない", async () => {
    const wrapper = render({
      text: 'なにかな\n> なにかな\n[なにかな](https://example.com)',
      nyaize: 'respect',
      author: { isCat: true }
    })
    await vi.dynamicImportSettled()
    await flushPromises()
    expect(wrapper.find('.text').text()).toBe('にゃにかにゃ')
    expect(wrapper.find('.quote').text()).toBe('なにかな')
    expect(wrapper.find('a.link').text()).toBe('なにかな')
  })

  it('猫でないユーザーや nyaize が true のときはにゃー化しない', async () => {
    const notCat = render({ text: 'なにかな', nyaize: 'respect', author: { isCat: false } })
    const trueValue = render({ text: 'なにかな', nyaize: true, author: { isCat: true } })
    await vi.dynamicImportSettled()
    await flushPromises()
    expect(notCat.text()).toBe('なにかな')
    expect(trueValue.text()).toBe('なにかな')
  })
})

describe('利用側から渡すもの', () => {
  it('emojiStyle が twemoji なら Unicode の絵文字を Twemoji の画像で表示する', () => {
    const native = render({ text: '😀' })
    expect(native.find('img.twemoji').exists()).toBe(false)
    expect(native.text()).toContain('😀')
    const twemoji = render({ text: '😀', emojiStyle: 'twemoji', twemojiBase: 'https://example.com/svg/' })
    expect(twemoji.find('img.twemoji').attributes('src')).toBe('https://example.com/svg/1f600.svg')
    expect(twemoji.find('img.twemoji').attributes('alt')).toBe('😀')
  })

  it('provide した emojis にある絵文字は画像で表示する', () => {
    const wrapper = render({ text: ':pudding:' }, { emojis: { pudding: { url: 'https://example.com/pudding.png' } } })
    expect(wrapper.find('img.emoji').attributes('src')).toBe('https://example.com/pudding.png')
  })

  it('domain を provide するとメンションのリンク先とアバターをそのサーバーから取る', async () => {
    const fetchMock = vi.fn(async () => ({
      ok: true,
      json: async () => ({ avatarUrl: 'https://misskey.example/avatar.png' })
    }))
    vi.stubGlobal('fetch', fetchMock)
    const wrapper = render({ text: '@alice@remote.example' }, { domain: 'misskey.example' })
    await flushPromises()
    expect(fetchMock).toHaveBeenCalledWith('https://misskey.example/api/users/show', expect.anything())
    expect(wrapper.find('a.mention').attributes('href')).toBe('https://misskey.example/@alice@remote.example')
    expect(wrapper.find('img.avatar').attributes('src')).toBe('https://misskey.example/avatar.png')
  })

  it('domain がないときはアバターを取りに行かない', async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)
    render({ text: '@alice@remote.example' })
    await flushPromises()
    expect(fetchMock).not.toHaveBeenCalled()
  })
})

describe('イベントと非同期の表示', () => {
  it('$[clickable] を押すと clickEv で ev の値を渡す', async () => {
    const wrapper = render({ text: '$[clickable.ev=hello 押す]' })
    await wrapper.find('.clickable').trigger('click')
    expect(wrapper.emitted('clickEv')).toEqual([['hello']])
  })

  it('言語付きのコードブロックは shiki でハイライトする', async () => {
    const wrapper = render({ text: '```js\nconst a = 1\n```' })
    await vi.dynamicImportSettled()
    await flushPromises()
    expect(wrapper.find('pre.shiki').attributes('data-lang')).toBe('js')
  })

  it('$[unixtime] は絶対時刻と相対時間を表示する', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date((1700000000 + 3 * 3600) * 1000))
    const wrapper = render({ text: '$[unixtime 1700000000]' })
    expect(wrapper.find('.unixtime').text()).toContain('(3時間前)')
    expect(wrapper.find('.unixtime').attributes('title')).toBe(new Date(1700000000 * 1000).toLocaleString())
  })

  it('$[unixtime] の中身が数値でなければ無効と表示する', () => {
    const wrapper = render({ text: '$[unixtime abc]' })
    expect(wrapper.find('.unixtime').text()).toBe('無効な日時')
  })
})
