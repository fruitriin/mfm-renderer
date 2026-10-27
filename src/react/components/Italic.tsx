import type { MfmSyntaxProps } from '../context.ts'
import { MfmComponent } from '../Mfm.tsx'

export function Italic({ children }: MfmSyntaxProps) {
  return (
    <i className="italic" style={{ fontStyle: 'oblique' }}>
      <MfmComponent tokens={children} />
    </i>
  )
}
