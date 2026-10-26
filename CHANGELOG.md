# Changelog

このプロジェクトの主な変更を記録する。

## [0.1.0] - 2026-10-26

### 追加

- `$[clickable.ev=名前 ...]` に対応した（`Fn/Clickable.vue`）。押されると、provide/inject（`mfmClickEvKey`）を通して `MfmRenderer` が `clickEv` イベントを発火する。Misskey Play の `Ui:C:mfm` の `onClickEv` に対応するためのものである
- `Rotate`（`$[rotate.deg=...]`）を登録した

### 変更

- 登録されていない関数（`unixtime` など）は、Misskey と同じく `$[名前 ...]` のまま表示するようにした
- `Mention` と `EmojiCode` は、inject した `domain` と `emojis` を `unref` で読むようにした。ref でもプレーンな値でも受け付ける
- `domain` がないときは、メンションのアバターを取りに行かないようにした

### 修正

- `Rotate.vue` が `token.args.deg` を読むように直した

## [0.0.1]

- 最初のバージョン
