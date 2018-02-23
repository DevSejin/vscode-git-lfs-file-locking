import { State } from "../data"
import { Lock } from "../services/git/lfs"

import {window} from 'vscode'
import * as git from "../services/git"

export default (filePath: string, state: State) => {
  return git.lfs.lock(filePath).then(({ code, err, out }) => {
    // console.log("lock code", code)
    // console.log("lock out", out)
    // console.error("lock err", err)

    if (code === 0) {
      const lock = JSON.parse(out) as Lock
      Object.assign(state, {
        type: "Valid",
        timestamp: Date.now(),
        data: state.data === null ? [lock] : state.data.concat(lock)
      })
    } else if (err) {
      window.showErrorMessage(err)
    }
    return state.data
  })
}
