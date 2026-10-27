/**
 * フレームワークごとの違いを除いた HTML にする。
 * Vue と React で同じ入力を描画した結果を比べるときに使う
 * - コメント（Vue の <!--v-if--> やテンプレート内のコメント）を消す
 * - scoped style の data-v-* 属性を消す
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
    const element = node as Element
    for (const name of element.getAttributeNames()) {
      if (name.startsWith('data-v-')) element.removeAttribute(name)
    }
  }
  comments.forEach((comment) => comment.parentNode?.removeChild(comment))
  return template.innerHTML
}
