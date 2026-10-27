import type { MfmSyntaxProps } from '../context.ts'
import { MfmComponent } from '../Mfm.tsx'

export function Strike({ children }: MfmSyntaxProps) {
  return (
    <del className="strike">
      <MfmComponent tokens={children} />
    </del>
  )
}
