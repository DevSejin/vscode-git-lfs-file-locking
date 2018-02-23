import { SpawnOptions } from "child_process"

import { spawn } from "child_process"
import { workspace } from "vscode"

interface ProcessResult {
  code: number
  err: string
  out: string
}

export type ProcessPromise = Promise<ProcessResult>

const createProcess = (command: string, options: SpawnOptions) => (
  ...args: Array<string | null>
): ProcessPromise =>
  new Promise(resolve => {
    const proc = spawn(
      command,
      args.filter(arg => arg !== null) as Array<string>,
      options
    )
    const stdout: Array<Buffer> = []
    const stderr: Array<Buffer> = []
    proc.stdout.on("data", (data: Buffer) => {
      stdout.push(data)
    })
    proc.stderr.on("data", (data: Buffer) => {
      stderr.push(data)
    })
    proc.on("close", code => {
      resolve({ code, err: stderr.toString(), out: stdout.toString() })
    })
  })

export const run = createProcess("git", { cwd: workspace.rootPath as string })
