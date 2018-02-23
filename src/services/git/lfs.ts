import { ProcessPromise } from "./run"

import { run } from "./run"

export interface Lock {
  id: string
  path: string
  owner: {
    name: string
  }
  locked_at: string
}

export const locks = (): ProcessPromise => run("lfs", "locks", "--json")
export const lock = (filePath: string): ProcessPromise =>
  run("lfs", "lock", "--json", filePath)
export const unlock = (id: string, force: boolean): ProcessPromise =>
  run("lfs", "unlock", "--json", force ? "--force" : null, "--id", id)
