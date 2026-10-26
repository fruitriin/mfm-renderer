<template>
  <a class="mention" :href="token.host ?? 'https://' + domainName + '/' + token.acct"
    ><img v-if="user" class="avatar" :src="user.avatarUrl" />{{ token.acct }}</a
  >
</template>

<script lang="ts">
import { defineComponent, unref } from 'vue'

export default defineComponent({
  props: ['token', 'children', 'style', 'className'],
  inject: ['domain'],
  data() {
    return {
      user: undefined as unknown as any
    }
  },
  computed: {
    // provide 側は文字列でも computed でもよい
    domainName(): string | null {
      return unref(this.domain as any) ?? null
    }
  },
  watch: {
    token: {
      immediate: true,
      async handler() {
        // 接続先が分からないときは、アバターを取りに行かずに名前だけ表示する
        const host = this.token.host ?? this.domainName
        if (!host) return
        // FIXME: なんかバウンスとかスロットルとか必要
        const res = await fetch(
          `https://${host}/api/users/search-by-username-and-host`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({
              detail: false,
              limit: 1,

              username: this.token.username
            })
          }
        ).catch(() => null)
        if (!res?.ok) return
        this.user = (await res.json())[0]
      }
    }
  }
})
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
