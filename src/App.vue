<script setup lang="ts">
import MfmText from "./components/MfmText.vue";
import { ref } from "vue";

const note = {
  id: "9ntvuujd2f",
  createdAt: "2023-12-29T07:34:57.049Z",
  userId: "9bs3a5r48b",
  text: "$[bg.color=b51 $[fg.color=fff  2桁　Normal ]] 挑戦した数字「**05**」\n$[sparkle 10手で当てることができました！]\nhttps://misskey.systems/play/9nr3u7p244 #Hit&Blowチャレンジ\n総当たりしちゃった",
  cw: null,
  visibility: "public",
  localOnly: false,
  reactionAcceptance: "nonSensitiveOnly",
  renoteCount: 0,
  repliesCount: 0,
  reactions: {
    ":neko_medetai_nya@.:": 1,
  },
  reactionEmojis: {},
  tags: ["hit&blowチャレンジ"],
  fileIds: [],
  files: [],
  replyId: null,
  renoteId: null,
  clippedCount: 0,
};

const text = ref(
  "$[bg.color=b51 $[fg.color=fff  2桁　Normal ]] 挑戦した数字「**05**」\n$[sparkle 10手で当てることができました！]\nhttps://misskey.systems/play/9nr3u7p244 #Hit&Blowチャレンジ\n総当たりしちゃった",
);

const samples = ref([
  `基本構文
#mfmart
**太字** <i>斜め</i> ~~打ち消し~~
\`inline code (JavaScript highlight)\`
> 引用
>> 引用の引用
注意）メンションとカスタム絵文字はエラーになります
`,
  `URL
[Wikipedia](https://ja.wikipedia.org/wiki/Misskey)
?[プレビューなしリンク](https://ja.wikipedia.org/wiki/ActivityPub)

日本語を含むリンクの場合<>で囲みます。
[Wikipedia](<https://ja.wikipedia.org/wiki/分散型ソーシャル・ネットワーク>)`,
  `
  コード(ブロック要素)
  \`\`\`
console.log("hello misskey")
\`\`\` `,
  `中央揃え(ブロック要素)
<center>
中央揃え
> 引用は無効です
\`\`\`
コードブロックは無効です
\`\`\`
</center>`,
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
  `
    フォント
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
// 未実装： Mention, Emoji
</script>

<template>
  <div>
    <h1>MFM Renderer</h1>
    <textarea v-model="text" style="height: 6rem; width: 40rem" />
    <hr />
    <MfmText :text="text" />

    <hr />
    <h2>テストコード</h2>
    <div v-for="sample in samples">
      <pre v-text="sample" />
      <MfmText :text="sample" />
    </div>
  </div>
</template>

<style scoped></style>
