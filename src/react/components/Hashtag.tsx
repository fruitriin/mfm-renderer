import type { MfmHashtag } from 'mfm-js'
import type { MfmSyntaxProps } from '../context.ts'

export function Hashtag({ token }: MfmSyntaxProps<MfmHashtag['props']>) {
  return (
    <a className="hashtag" href={'/tags/' + token?.hashtag}>
      #{token?.hashtag}
    </a>
  )
}
