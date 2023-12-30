<template>
  <a class="mention" :href="host + '/' + token.acct"
    ><img v-if="user" class="avatar" :src="user.avatarUrl" />{{ token.acct }}</a
  >
</template>

<script lang="ts">
export default {
  props: ["token", "children", "style", "className"],
  data() {
    return {
      user: undefined,
    };
  },
  mounted() {
    this.getUser();
  },
  methods: {
    async getUser() {
      const res = await fetch(
        "https://misskey.systems/api/users/search-by-username-and-host",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: JSON.stringify({
            detail: false,
            limit: 1,

            username: "ikasoba",
          }),
        },
      );
      this.user = (await res.json())[0];
    },
  },
  computed: {
    host() {
      return this.token.host === null ? "" : this.token.host;
    },
  },
};
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
