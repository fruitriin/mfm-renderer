<template>
  <a class="mention" :href="token.host ?? 'https://' + domainName + '/' + token.acct"
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

watch(
  () => props.token,
  async () => {
    // 接続先が分からないときは、アバターを取りに行かずに名前だけ表示する
    const host = props.token.host ?? domainName.value
    if (!host) return
    // FIXME: なんかバウンスとかスロットルとか必要
    const res = await fetch(`https://${host}/api/users/search-by-username-and-host`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        detail: false,
        limit: 1,
        username: props.token.username
      })
    }).catch(() => null)
    if (!res?.ok) return
    user.value = (await res.json())[0]
  },
  { immediate: true }
)
</script>

<style>
.mention {
  background: rgba(93, 176, 218, 0.1);

  display: inline-block;
  padding: 4px 8px 4px 4px;
  border-radius: 999px;
  color: var(--mention);
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
