/**
 * プレビューで使うカスタム絵文字を、Misskey のサーバーから読み込む。
 * 一度読み込んだら localStorage に置き、次からはそれを使う
 */
export type DemoEmojis = Record<string, { url: string }>

export async function loadEmojis(domain: string): Promise<DemoEmojis> {
  const cached = localStorage.getItem('emojis')
  const json = cached
    ? (JSON.parse(cached) as { emojis: { name: string; url: string }[] })
    : await fetch(`https://${domain}/api/emojis`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({})
      }).then((res) => res.json())
  if (!cached) localStorage.setItem('emojis', JSON.stringify(json))
  return Object.fromEntries(json.emojis.map((emoji: { name: string; url: string }) => [emoji.name, { url: emoji.url }]))
}
