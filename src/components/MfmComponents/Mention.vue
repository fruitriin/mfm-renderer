<template>
  <a class="mention" :href="token.host ?? 'https://' + domain + '/' + token.acct"
    ><img v-if="user" class="avatar" :src="user.avatarUrl" />{{ token.acct }}</a
  >
</template>

<script setup lang="ts">
import { inject, ref, watch } from 'vue'

const props = defineProps<{
  token?: any
  children?: any
  style?: object
  className?: string
}>()

const domain = inject<any>('domain', '')
const user = ref<any>(undefined)

watch(
  () => props.token,
  async () => {
    // FIXME: なんかバウンスとかスロットルとか必要
    const res = await fetch(
      `https:/${props.token.host ?? domain.value}/api/users/search-by-username-and-host`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
          detail: false,
          limit: 1,
          username: props.token.username
        })
      }
    )
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
