import { describe, expect, it } from 'vitest'
import { getComponent, mfm, twemojiFileName, validBorderStyle, validColor, validNumber, validTime } from '../src/utils/mfmUtil.ts'

describe('validTime', () => {
  it('秒の指定だけを受け付ける', () => {
    expect(validTime('1s')).toBe('1s')
    expect(validTime('0.5s')).toBe('0.5s')
    expect(validTime('-1s')).toBe('-1s')
  })

  it('単位が違うもの・文字列でないものは undefined を返す', () => {
    expect(validTime('1ms')).toBeUndefined()
    expect(validTime('1')).toBeUndefined()
    expect(validTime('1s; color: red')).toBeUndefined()
    expect(validTime(true)).toBeUndefined()
    expect(validTime(undefined)).toBeUndefined()
    expect(validTime(null)).toBeUndefined()
  })
})

describe('validColor', () => {
  it('3〜6 桁の 16 進数を受け付ける', () => {
    expect(validColor('f00')).toBe('f00')
    expect(validColor('FF0000')).toBe('FF0000')
    expect(validColor('f00a')).toBe('f00a')
  })

  it('色の名前・# 付き・桁数の違うものは undefined を返す', () => {
    expect(validColor('red')).toBeUndefined()
    expect(validColor('#f00')).toBeUndefined()
    expect(validColor('ff')).toBeUndefined()
    expect(validColor('ff00000')).toBeUndefined()
    expect(validColor(true)).toBeUndefined()
  })
})

describe('validBorderStyle', () => {
  it('CSS のボーダースタイルを小文字にして返す', () => {
    expect(validBorderStyle('dashed')).toBe('dashed')
    expect(validBorderStyle('SOLID')).toBe('solid')
  })

  it('知らないスタイルは undefined を返す', () => {
    expect(validBorderStyle('none')).toBeUndefined()
    expect(validBorderStyle('solid; color: red')).toBeUndefined()
    expect(validBorderStyle(true)).toBeUndefined()
  })
})

describe('validNumber', () => {
  it('数値の文字列を数値にして返す', () => {
    expect(validNumber('1.5')).toBe(1.5)
    expect(validNumber('-2')).toBe(-2)
    expect(validNumber(3)).toBe(3)
  })

  it('数値として読めないものは undefined を返す', () => {
    expect(validNumber('abc')).toBeUndefined()
    expect(validNumber(true)).toBeUndefined()
    expect(validNumber('')).toBeUndefined()
  })
})

describe('getComponent', () => {
  it('ノード種別や関数名から Mfm 接頭辞付きの登録名を作る', () => {
    expect(getComponent('bold')).toBe('MfmBold')
    expect(getComponent('blockCode')).toBe('MfmBlockCode')
    expect(getComponent('x2')).toBe('MfmX2')
  })

  it('空文字なら空文字を返す', () => {
    expect(getComponent('')).toBe('')
  })
})

describe('mfm', () => {
  it('空の入力では空の配列を返す', () => {
    expect(mfm('', false)).toEqual([])
  })

  it('plain のときはテキスト・絵文字・プレーンだけを解析する', () => {
    expect(mfm('**太字**', true).map((node) => node.type)).toEqual(['text'])
    expect(mfm('**太字**', false).map((node) => node.type)).toEqual(['bold'])
  })
})

describe('twemojiFileName', () => {
  it('Misskey の char2twemojiFilePath と同じ規則でファイル名を作る', () => {
    expect(twemojiFileName('😀')).toBe('1f600')
    // ZWJ を含まないときは FE0F（異体字セレクタ）を除く
    expect(twemojiFileName('⚔️')).toBe('2694')
    expect(twemojiFileName('🛡️')).toBe('1f6e1')
    // ZWJ を含むときは FE0F を残す
    expect(twemojiFileName('🏳️‍🌈')).toBe('1f3f3-fe0f-200d-1f308')
    expect(twemojiFileName('👨‍💻')).toBe('1f468-200d-1f4bb')
  })
})
