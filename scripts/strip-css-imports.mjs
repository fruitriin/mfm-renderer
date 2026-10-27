// 型定義（dist/types/react）から CSS の import を取り除く。
// React 版は index.ts で CSS を import してビルドに含めるが、型定義に残ると、
// 利用側の型チェック（TypeScript 6 の noUncheckedSideEffectImports）で見つからないと言われるため
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'

const dir = path.resolve(import.meta.dirname, '../dist/types/react')

for (const entry of readdirSync(dir, { recursive: true })) {
  const file = path.join(dir, entry.toString())
  if (!file.endsWith('.d.ts')) continue
  const source = readFileSync(file, 'utf8')
  const stripped = source.replace(/^import '[^']+\.css';\n/gm, '')
  if (stripped !== source) writeFileSync(file, stripped)
}
