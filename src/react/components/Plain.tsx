import type { MfmSyntaxProps } from '../context.ts'
import { MfmComponent } from '../Mfm.tsx'

export function Plain({ children }: MfmSyntaxProps) {
  return (
    <span className="plain">
      <MfmComponent tokens={children} />
    </span>
  )
}
