<!--
  /**
   * $[unixtime 1234567890]
   * Unix時刻スタンプを相対時間表示に変換
   */
-->
<template>
  <span
    :class="`unixtime ${className ?? ''}`"
    :style="style"
    :title="absoluteTime"
  >
    <i class="ti ti-clock"></i>
    {{ relativeTime }}
  </span>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue";
import { computed } from "vue";

const props = defineProps<{
  token?: any;
  children?: any;
  style?: CSSProperties;
  className?: string;
}>();

/**
 * Unix時刻スタンプから相対時間を計算
 */
const relativeTime = computed(() => {
  const timestamp = props.token?.args?.unixtime;
  if (!timestamp) return "";

  const now = Date.now();
  const targetTime = parseInt(timestamp, 10) * 1000;
  const diff = now - targetTime;

  if (diff < 0) {
    // 未来の時刻
    const absDiff = Math.abs(diff);
    if (absDiff < 60000) return "数秒後";
    if (absDiff < 3600000) return `${Math.floor(absDiff / 60000)}分後`;
    if (absDiff < 86400000) return `${Math.floor(absDiff / 3600000)}時間後`;
    if (absDiff < 2592000000) return `${Math.floor(absDiff / 86400000)}日後`;
    if (absDiff < 31536000000)
      return `${Math.floor(absDiff / 2592000000)}ヶ月後`;
    return `${Math.floor(absDiff / 31536000000)}年後`;
  }

  // 過去の時刻
  if (diff < 60000) return "数秒前";
  if (diff < 3600000) return `${Math.floor(diff / 60000)}分前`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}時間前`;
  if (diff < 2592000000) return `${Math.floor(diff / 86400000)}日前`;
  if (diff < 31536000000) return `${Math.floor(diff / 2592000000)}ヶ月前`;
  return `${Math.floor(diff / 31536000000)}年前`;
});

/**
 * 絶対時間の表示（ツールチップ用）
 */
const absoluteTime = computed(() => {
  const timestamp = props.token?.args?.unixtime;
  if (!timestamp) return "";

  const date = new Date(parseInt(timestamp, 10) * 1000);
  return date.toLocaleString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
});
</script>

<style scoped>
.unixtime {
  display: inline-block;
  border: 1px solid currentColor;
  border-radius: 50%;
  padding: 0.25em 0.5em;
  font-size: 0.9em;
  cursor: help;
}

.unixtime i {
  margin-right: 0.25em;
}
</style>
