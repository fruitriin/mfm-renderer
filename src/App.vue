<script setup lang="ts">
import MfmText from "./components/MfmText.vue";

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
</script>

<template>
  <div>
    <MfmText :text="note.text" />
  </div>
</template>

<style scoped></style>
