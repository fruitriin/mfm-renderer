<template>
  <a class="mention" :href="href"
    ><img v-if="user" class="avatar" :src="user.avatarUrl" />{{ token.acct }}</a
  >
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed, inject, ref, unref, watch } from 'vue'

const props = defineProps<{
  token?: any
  children?: any
  style?: CSSProperties
  className?: string
}>()

// provide 側は文字列でも ref・computed でもよい
const domain = inject<any>('domain', '')
const domainName = computed<string | null>(() => unref(domain) || null)
const user = ref<any>(undefined)

// 接続先のサーバーのユーザーページへのリンク。接続先が分からないときは、メンション先のサーバーへリンクする
const href = computed(() => {
  if (domainName.value) return `https://${domainName.value}/${props.token.acct}`
  if (props.token.host) return `https://${props.token.host}/@${props.token.username}`
  return undefined
})

// token が素早く変わったとき、古いレスポンスで上書きしないための世代番号
let generation = 0

watch(
  [() => props.token, domainName],
  async () => {
    const current = ++generation
    user.value = undefined
    // アバターは接続先（domain）のサーバーにだけ問い合わせる。
    // 本文に書かれたホストへ直接問い合わせると、閲覧者の IP が任意のサーバーに伝わってしまうため
    if (!domainName.value) return
    // FIXME: なんかバウンスとかスロットルとか必要
    const res = await fetch(`https://${domainName.value}/api/users/show`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        username: props.token.username,
        host: props.token.host ?? null
      })
    }).catch(() => null)
    if (!res?.ok) return
    const found = await res.json().catch(() => undefined)
    if (current !== generation) return
    // 想定外の形の応答では、アバターなしで表示する
    if (typeof found?.avatarUrl === 'string') user.value = found
  },
  { immediate: true }
)
</script>

<style>
/* Misskey 2024.10 以降のテーマ変数（--MI_THEME-*）を使い、なければ以前の名前を使う */
.mention {
  background: rgba(93, 176, 218, 0.1);

  display: inline-block;
  padding: 4px 8px 4px 4px;
  border-radius: 999px;
  color: var(--MI_THEME-mention, var(--mention));
}
/* 相対色に対応したブラウザでは、背景もテーマのメンション色に合わせる */
@supports (color: color(from red srgb r g b / 0.1)) {
  .mention {
    background: color(from var(--MI_THEME-mention, var(--mention, rgb(93, 176, 218))) srgb r g b / 0.1);
  }
}
.avatar {
  width: 1.5em;
  height: 1.5em;
  object-fit: cover;
  margin: 0 0.2em 0 0;
  vertical-align: bottom;
  border-radius: 100%;
}
</style>
