import { ref } from "vue";

export const samples = ref([
  `基本構文
#mfmart @mention :blob_dj:
**太字** <i>斜め</i> ~~打ち消し~~
\`inline code (JavaScript highlight)\`
> 引用
>> 引用の引用
`,
  `URL
[Wikipedia](https://ja.wikipedia.org/wiki/Misskey)
?[プレビューなしリンク](https://ja.wikipedia.org/wiki/ActivityPub)

日本語を含むリンクの場合<>で囲みます。
[Wikipedia](<https://ja.wikipedia.org/wiki/分散型ソーシャル・ネットワーク>)`,
  "コード(ブロック要素) \n" +
    "``` \n" +
    "console.log('hello misskey') \n" +
    "``` ",
  "中央揃え(ブロック要素) \n<center>中央揃え > 引用は無効です```コードブロックは無効です```</center>",
  `
検索
misskey 検索
misskey [検索]
misskey Search
misskey [Search]
`,
  ` 目立たない字
 プリンはmisskey開発者の好物<small>だった気がする…</small>`,
  `文字色・背景色
$[fg.color=f00 赤字]
$[bg.color=ff0 黄背景]
    `,
  `ブラー
  もりもり$[blur あ]んこ`,
  `フォント
$[font.serif MisskeyでFediverseの世界が広がります]
$[font.monospace MisskeyでFediverseの世界が広がります]
$[font.cursive MisskeyでFediverseの世界が広がります]
$[font.fantasy MisskeyでFediverseの世界が広がります]
`,
  `反転
      $[flip MisskeyでFediverseの世界が広がります]
  $[flip.v MisskeyでFediverseの世界が広がります]
  $[flip.h,v MisskeyでFediverseの世界が広がります]`,
  `角度変更
    $[rotate.deg=30 misskey]
      `,
  `日時
    $[unixtime 1700000000]`,
  `ルビ
    うま$[ruby 味 あじ]`,
  `位置変更
      😏$[position.x=0.8,y=0.5 🍮]😀`,
  `拡大
      $[scale.x=4,y=2 🍮]
  `,
  `シンプル拡大
  $[x2 x2]
  $[x3 x3]
  $[x4 x4]`,
  `$[jelly 🍮] $[jelly.speed=5s 🍮]`,
  `$[tada 🍮] $[tada.speed=5s 🍮]`,
  `$[jump 🍮] $[jump.speed=5s 🍮]`,
  `$[bounce 🍮] $[bounce.speed=5s 🍮]`,
  `$[spin 🍮] $[spin.left 🍮] $[spin.alternate 🍮]
  $[spin.x 🍮] $[spin.x,left 🍮] $[spin.x,alternate 🍮]
  $[spin.y 🍮] $[spin.y,left 🍮] $[spin.y,alternate 🍮]

  $[spin.speed=5s 🍮]`,
  `$[shake 🍮] $[shake.speed=5s 🍮]`,
  `$[twitch 🍮] $[twitch.speed=5s 🍮]`,
  `$[rainbow 🍮] $[rainbow.speed=5s 🍮]
  $[rainbow 色なし文字]
  $[rainbow $[fg.color=f0f 色付き文字]]`,
  `$[sparkle 🍮]`,
  `<plain>**bold** @mention #hashtag \`code\` $[x2 🍮]</plain>`,
]);
