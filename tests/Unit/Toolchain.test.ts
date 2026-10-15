import { spawnSync } from "node:child_process"
import { fileURLToPath } from "node:url"

import { describe, expect, it } from "vite-plus/test"

const root = fileURLToPath(new URL("../../", import.meta.url))
const cli = fileURLToPath(new URL("../../node_modules/vite-plus/bin/vp", import.meta.url))

function format(source: string): string {
  const result = spawnSync(cli, ["fmt", "--stdin-filepath", "resources/js/toolchain-probe.tsx"], {
    cwd: root,
    input: source,
    encoding: "utf8",
  })

  expect(result.error).toBeUndefined()
  expect(result.status, result.stderr).toBe(0)

  return result.stdout
}

describe("frontend formatter", () => {
  it("formats TSX without changing its template expressions", () => {
    const result = format("export const Greeting=({name}:{name:string})=><div>Hello {name}</div>;")

    expect(result).toContain("Hello {name}")
    expect(result).toContain("export const Greeting =")
    expect(format(result)).toBe(result)
  })

  it("normalizes Tailwind class order consistently", () => {
    const first = format('export const Example = () => <div className="p-4 flex" />')
    const second = format('export const Example = () => <div className="flex p-4" />')

    expect(first).toBe(second)
    expect(first).toContain('className="flex p-4"')
  })
})
