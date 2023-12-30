import { ref } from "vue";

type Sample = { title: string; body: string };
export const samples = ref<Sample[]>([
  {
    title: "基本構文",
    body: `**太字** <i>斜め</i> ~~打ち消し~~
\`inline code (JavaScript highlight)\`
> 引用
>> 引用の引用
`,
  },
  {
    title: "Misskey",
    body: "#mfmart @mention :110:",
  },
  {
    title: "URL",
    body: `
[Wikipedia](https://ja.wikipedia.org/wiki/Misskey)
?[プレビューなしリンク](https://ja.wikipedia.org/wiki/ActivityPub)

日本語を含むリンクの場合<>で囲みます。
[Wikipedia](<https://ja.wikipedia.org/wiki/分散型ソーシャル・ネットワーク>)`,
  },
  {
    title: "コード(ブロック要素) ",
    body: "```\n" + "console.log('hello misskey') \n" + "```\n",
  },
  {
    title: "中央寄せ",
    body: "<center>中央揃え(ブロック要素) \n 中央揃え \n > 引用は無効です \n ```\nコードブロックは無効です\n```\n</center>",
  },
  {
    title: "検索",
    body: `misskey 検索
misskey [検索]
misskey Search
misskey [Search]
`,
  },
  {
    title: "目立たない字",
    body: `プリンはmisskey開発者の好物<small>だった気がする…</small>`,
  },
  {
    title: "文字色・背景色",
    body: `$[fg.color=f00 赤字]
$[bg.color=ff0 黄背景]`,
  },
  {
    title: "Plane",
    body: `<plain>**bold** @mention #hashtag \`code\` $[x2 🍮]</plain>`,
  },
  { title: "ブラー", body: `もりもり$[blur あ]んこ` },
  {
    title: "フォント",
    body: `
$[font.serif MisskeyでFediverseの世界が広がります]
$[font.monospace MisskeyでFediverseの世界が広がります]
$[font.cursive MisskeyでFediverseの世界が広がります]
$[font.fantasy MisskeyでFediverseの世界が広がります]
`,
  },
  {
    title: "`反転",
    body: `
$[flip MisskeyでFediverseの世界が広がります]
$[flip.v MisskeyでFediverseの世界が広がります]
$[flip.h,v MisskeyでFediverseの世界が広がります]`,
  },
  {
    title: "角度変更",
    body: `$[rotate.deg=30 misskey]`,
  },
  { title: "日時(非対応)", body: `$[unixtime 1700000000]` },
  { title: "ルビ", body: `うま$[ruby 味 あじ]` },
  { title: "位置変更", body: `😏$[position.x=0.8,y=0.5 🍮]😀` },

  { title: "拡大", body: `$[scale.x=4,y=2 🍮]` },
  {
    title: `シンプル拡大`,
    body: `
  $[x2 x2]
  $[x3 x3]
  $[x4 x4]`,
  },

  { title: "tada", body: `$[tada 🍮] $[tada.speed=2s 🍮]` },
  { title: "bonuce", body: `$[bounce 🍮] $[bounce.speed=5s 🍮]` },
  {
    title: "spin",
    body: `
  $[spin 🍮] $[spin.left 🍮] $[spin.alternate 🍮]
  $[spin.x 🍮] $[spin.x,left 🍮] $[spin.x,alternate 🍮]
  $[spin.y 🍮] $[spin.y,left 🍮] $[spin.y,alternate 🍮]

  $[spin.speed=5s 🍮]`,
  },
  { title: "Twitch", body: `$[twitch 🍮] $[twitch.speed=5s 🍮]` },
  {
    title: "レインボー",
    body: `$[rainbow 🍮] $[rainbow.speed=5s 🍮]
$[rainbow 色なし文字]
$[rainbow $[fg.color=f0f 色付き文字]]`,
  },
  {
    title: "スパークル",
    body: `$[sparkle 🍮]`,
  },
]);
