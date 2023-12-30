# Meintenable MFM Renderer Component

MFMをレンダリングするコンポーネント
各文法ごとにコンポーネント化されているのでメンテナンスしやすい気がする。

```
<MfmText text="Hello **mfm**" />
```

| ファイル名            | 説明      | 進捗                                                     |
|------------------|---------|--------------------------------------------------------|
| Blockcode.vue    | 複数行のコード | よさそう                                               |
| Bold.vue         | 太字      | よさそう                                                   |
| EmojiCode.vue    | カスタム絵文字 | よさそう                                             |
| Inlinecode.vue   | 一行のコード  | よさそう                                                   |
| Mention.vue      | メンション   | よさそう                                                   |
| Search.vue       | 検索      | よさそう                                                   |
| Text.vue         | テキスト    | よさそう                                                   |
| Center.vue       | 中央寄せ    | yosasou                                               |
| Fn.vue           | なんか色々   | fg, bg, blur, font, flip, rotate, scale, position-> OK |
| Italic.vue       | 斜体      | よさそう                                                   |
| Plain.vue        |         | よさそう                                                   |
| Small.vue        |         | よさそう                                                   |
| UnicodeEmoji.vue |         | 暫定                                                     |
| Hashtag.vue      | ハッシュタグ  | よさそう                                                   |
| Link.vue         | リンク構文   | よさそう                                                   |
| Quote.vue        | 引用      | よさそう                                                   |
| Strike.vue       | 打ち消し線   | よさそう                                                   |
| Url.vue          | URL     | よさそう                                                   |
| Ruby             | ルビ      | ルビとしてパースされてない                                          |


Fn
fg, bg, font, flip, rote, scale, position -> ok
animation -> speed option ok, deley option not
sparkle, ruby,unixtime -> not yet
