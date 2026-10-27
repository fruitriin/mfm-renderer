import type { MfmSyntaxProps } from '../context.ts'
import { MfmComponent } from '../Mfm.tsx'

export function Center({ children }: MfmSyntaxProps) {
  return (
    <div className="center">
      <MfmComponent tokens={children} />
    </div>
  )
}
