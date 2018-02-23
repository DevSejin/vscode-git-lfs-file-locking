import { State } from "../data"
import { Lock } from "../services/git/lfs"

import {window} from 'vscode'
import * as git from "../services/git"

export default (state: State) => {
  Object.assign(state, {
    type: "Pending",
    timestamp: Date.now()
  })
  return git.lfs.locks().then(({ code, err, out }) => {
    // console.log("locks code", code)
    // console.log("locks out", out)
    // console.error("locks err", err)

    if (code === 0) {
      const locks = JSON.parse(out) as Lock
      Object.assign(state, {
        type: "ValidState",
        timestamp: Date.now(),
        data: locks
      })
    } else if (err) {
      window.showErrorMessage(err)
    }
    return state.data
  })
}
