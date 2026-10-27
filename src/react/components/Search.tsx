import { useState } from 'react'
import type { MfmSearch } from 'mfm-js'
import type { MfmSyntaxProps } from '../context.ts'

export function Search({ token }: MfmSyntaxProps<MfmSearch['props']>) {
  const [query, setQuery] = useState(token?.query ?? '')
  const search = () => {
    window.open('https://www.google.com/search?q=' + encodeURIComponent(query), '_blank')
  }
  return (
    <div className="search">
      <input type="text" value={query} onChange={(event) => setQuery(event.target.value)} />
      <button onClick={search}>検索</button>
    </div>
  )
}
