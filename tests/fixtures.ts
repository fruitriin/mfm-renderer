/**
 * 描画のテストに使う MFM の入力。
 * フレームワークに依存しない形にしておき、Vue 版と React 版で同じ入力を描画して比べる
 */
export type Fixture = {
  name: string
  text: string
}

export const syntaxFixtures: Fixture[] = [
  { name: 'text', text: 'こんにちは' },
  { name: 'text（改行）', text: '1 行目\n2 行目\r\n3 行目' },
  { name: 'bold', text: '**太字** と <b>タグの太字</b>' },
  { name: 'italic', text: '<i>斜体</i> と *アスタリスク*' },
  { name: 'strike', text: '~~打ち消し~~ と <s>タグ</s>' },
  { name: 'small', text: '<small>小さい文字</small>' },
  { name: 'center', text: '<center>中央寄せ</center>' },
  { name: 'quote', text: '> 引用\n>> 引用の引用' },
  { name: 'plain', text: '<plain>**太字にしない** @mention #tag</plain>' },
  { name: 'inlineCode', text: '`const a = 1`' },
  { name: 'blockCode（言語なし）', text: '```\nconsole.log(1)\n```' },
  { name: 'url', text: 'https://example.com/path?q=1' },
  { name: 'url（山括弧）', text: '<https://example.com/日本語>' },
  { name: 'link', text: '[リンク **太字**](https://example.com)' },
  { name: 'link（silent）', text: '?[プレビューなし](https://example.com)' },
  { name: 'mention', text: '@alice と @bob@example.com' },
  { name: 'hashtag', text: '#misskey' },
  { name: 'emojiCode（未登録）', text: ':unknown_emoji:' },
  { name: 'unicodeEmoji', text: '🍮😀' },
  { name: 'search', text: 'misskey 検索' },
  { name: 'mathInline', text: '\\(x^2\\)' }
]

export const fnFixtures: Fixture[] = [
  { name: 'fg', text: '$[fg.color=00f 青] $[fg 既定の赤] $[fg.color=red 無効な色]' },
  { name: 'bg', text: '$[bg.color=ff0 黄] $[bg 既定の赤]' },
  { name: 'font', text: '$[font.serif 明朝] $[font.monospace 等幅] $[font.cursive 筆記] $[font.fantasy 装飾] $[font.emoji 絵文字] $[font.math 数式]' },
  { name: 'blur', text: '$[blur ぼかし]' },
  { name: 'flip', text: '$[flip 左右] $[flip.v 上下] $[flip.h,v 両方]' },
  { name: 'rotate', text: '$[rotate 既定] $[rotate.deg=30 30 度]' },
  { name: 'position', text: '$[position.x=1,y=-0.5 移動]' },
  { name: 'scale', text: '$[scale.x=2,y=3 拡大] $[scale.x=10 上限は 5]' },
  { name: 'x2・x3・x4', text: '$[x2 2 倍] $[x3 3 倍] $[x4 4 倍]' },
  { name: 'border', text: '$[border 既定] $[border.style=dashed,width=2,radius=4,color=f00 指定] $[border.style=foo,noclip 無効なスタイル]' },
  { name: 'ruby', text: '$[ruby 漢字 かんじ] $[ruby **太字** ふとじ]' },
  { name: 'clickable', text: '$[clickable.ev=hello 押す]' },
  { name: 'tada', text: '$[tada 🍮] $[tada.speed=2s,delay=1s 🍮]' },
  { name: 'jelly', text: '$[jelly 🍮] $[jelly.speed=2s 🍮]' },
  { name: 'twitch', text: '$[twitch 🍮] $[twitch.speed=2s 🍮]' },
  { name: 'shake', text: '$[shake 🍮] $[shake.speed=2s 🍮]' },
  { name: 'spin', text: '$[spin 🍮] $[spin.left 🍮] $[spin.alternate 🍮] $[spin.x 🍮] $[spin.y,speed=3s 🍮]' },
  { name: 'jump', text: '$[jump 🍮] $[jump.speed=2s 🍮]' },
  { name: 'bounce', text: '$[bounce 🍮] $[bounce.speed=2s 🍮]' },
  { name: 'rainbow', text: '$[rainbow 🍮] $[rainbow.speed=2s 🍮]' },
  { name: 'sparkle', text: '$[sparkle 🍮]' },
  { name: '未対応の関数', text: '$[foo 中身]' },
  { name: '入れ子', text: '$[x2 $[fg.color=f00 **赤い太字**]]' }
]
