/**
 * フレームワークごとの違いを除いた HTML にする。
 * Vue と React で同じ入力を描画した結果を比べるときに使う
 * - コメント（Vue の <!--v-if--> やテンプレート内のコメント）を消す
 * - scoped style の data-v-* 属性と、空の class・style 属性を消す
 * - input の value 属性を消す（Vue の v-model は属性を書かず、React は書く）
 * - 属性、class、style の宣言をそれぞれ名前の順に並べる。どの順でも表示は変わらないため
 */
export function normalizeHtml(html: string): string {
  const template = document.createElement('template')
  template.innerHTML = html
  const walker = document.createTreeWalker(template.content, NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_ELEMENT)
  const comments: Node[] = []
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    if (node.nodeType === Node.COMMENT_NODE) {
      comments.push(node)
      continue
    }
    normalizeElement(node as Element)
  }
  comments.forEach((comment) => comment.parentNode?.removeChild(comment))
  return template.innerHTML
}

function normalizeElement(element: Element) {
  const attributes = element.getAttributeNames().map((name) => [name, element.getAttribute(name) ?? ''] as const)
  for (const [name] of attributes) element.removeAttribute(name)
  const normalized = attributes
    .filter(([name]) => !name.startsWith('data-v-'))
    .filter(([name]) => !(element.tagName === 'INPUT' && name === 'value'))
    .map(([name, value]) => {
      if (name === 'class') return [name, value.split(/\s+/).filter(Boolean).sort().join(' ')] as const
      if (name === 'style') return [name, sortStyle(value)] as const
      return [name, value] as const
    })
    .filter(([name, value]) => !((name === 'class' || name === 'style') && value === ''))
    .sort(([a], [b]) => a.localeCompare(b))
  for (const [name, value] of normalized) element.setAttribute(name, value)
}

function sortStyle(style: string): string {
  return style
    .split(';')
    .map((declaration) => declaration.trim())
    .filter(Boolean)
    .sort()
    .join('; ')
}
