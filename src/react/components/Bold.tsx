import type { MfmSyntaxProps } from '../context.ts'
import { MfmComponent } from '../Mfm.tsx'

export function Bold({ children }: MfmSyntaxProps) {
  return (
    <b className="bold">
      <MfmComponent tokens={children} />
    </b>
  )
}
