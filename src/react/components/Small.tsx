import type { MfmSyntaxProps } from '../context.ts'
import { MfmComponent } from '../Mfm.tsx'

export function Small({ children }: MfmSyntaxProps) {
  return (
    <small className="small" style={{ opacity: 0.7 }}>
      <MfmComponent tokens={children} />
    </small>
  )
}
