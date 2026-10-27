import { useEffect, useState } from 'react'
import type { MfmMention } from 'mfm-js'
import { useMfmEnvironment } from '../context.ts'
import type { MfmSyntaxProps } from '../context.ts'

export function Mention({ token }: MfmSyntaxProps<MfmMention['props']>) {
  const { domain } = useMfmEnvironment()
  const username = token?.username
  const host = token?.host ?? null
  // どのユーザーのアバターかを一緒に持ち、メンション先が変わったら古いアバターを出さない
  const key = `${domain}|${username}|${host}`
  const [avatar, setAvatar] = useState<{ key: string; url: string } | null>(null)
  const avatarUrl = avatar?.key === key ? avatar.url : null

  // 接続先のサーバーのユーザーページへのリンク。接続先が分からないときは、メンション先のサーバーへリンクする
  const href = domain ? `https://${domain}/${token?.acct}` : host ? `https://${host}/@${username}` : undefined

  useEffect(() => {
    let cancelled = false
    // アバターは接続先（domain）のサーバーにだけ問い合わせる。
    // 本文に書かれたホストへ直接問い合わせると、閲覧者の IP が任意のサーバーに伝わってしまうため
    if (!domain || !username) return
    ;(async () => {
      const res = await fetch(`https://${domain}/api/users/show`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({ username, host })
      }).catch(() => null)
      if (!res?.ok) return
      const found = await res.json().catch(() => undefined)
      // 想定外の形の応答では、アバターなしで表示する
      if (!cancelled && typeof found?.avatarUrl === 'string') setAvatar({ key, url: found.avatarUrl })
    })()
    return () => {
      cancelled = true
    }
  }, [key, domain, username, host])

  return (
    <a className="mention" href={href}>
      {avatarUrl && <img className="avatar" src={avatarUrl} />}
      {token?.acct}
    </a>
  )
}
