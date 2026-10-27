import type { MfmUrl } from 'mfm-js'
import type { MfmSyntaxProps } from '../context.ts'

export function Url({ token }: MfmSyntaxProps<MfmUrl['props']>) {
  return (
    <a className="url" href={token?.url}>
      {token?.url}
    </a>
  )
}
