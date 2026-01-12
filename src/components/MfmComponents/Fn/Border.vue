<template>
  <MfmComponent
    :className="`border ${className ?? ''}`"
    :tokens="children"
    :style="[borderStyle, style]"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CSSProperties } from 'vue'
import type { MfmFn, MfmInline } from 'mfm-js'

const props = defineProps<{
  token?: MfmFn['props']
  children?: MfmInline[]
  style?: CSSProperties
  className?: string
}>()

/**
 * 16進数カラーコードが有効かどうかを検証する
 * 3〜6桁の16進数を許可（本家Misskey準拠）
 * @param color - 検証するカラーコード（#なし）
 * @returns 有効なカラーコードならそのまま返し、無効ならundefinedを返す
 */
function validColor(color: string | undefined | null): string | undefined {
  if (!color) return undefined
  if (/^[0-9a-f]{3,6}$/i.test(color)) return color
  return undefined
}

/**
 * ボーダースタイルが有効かどうかを検証する
 * @param style - 検証するボーダースタイル
 * @returns 有効なボーダースタイルならそのまま返し、無効ならundefinedを返す
 */
function validBorderStyle(style: string | undefined | null): string | undefined {
  if (!style) return undefined
  const normalized = style.toLowerCase()
  const validStyles = ['hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset']
  return validStyles.includes(normalized) ? normalized : undefined
}

/**
 * 数値が有効かどうかを検証する（本家Misskey準拠）
 * @param value - 検証する数値文字列
 * @returns 有効な数値ならパースした数値を返し、無効ならundefinedを返す
 */
function validNumber(value: string | undefined | null): number | undefined {
  if (!value) return undefined
  const num = parseFloat(value)
  if (isNaN(num)) return undefined
  return num
}

const borderStyle = computed<CSSProperties>(() => {
  const args = props.token?.args ?? {}

  const color = validColor(args.color) || 'f00'
  const style = validBorderStyle(args.style) || 'solid'
  const width = validNumber(args.width) ?? 1
  const radius = validNumber(args.radius) ?? 0
  const noclip = 'noclip' in args

  return {
    border: `${width}px ${style} #${color}`,
    borderRadius: `${radius}px`,
    ...(!noclip && { overflow: 'clip' })
  }
})
</script>

<style></style>
