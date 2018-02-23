import { State } from "../data"

import {window} from 'vscode'
import * as git from "../services/git"

export default (id: string, force: boolean, state: State) => {
  return git.lfs.unlock(id, force).then(({ code, err, out }) => {
    // console.log("unlock code", code)
    // console.log("unlock out", out)
    // console.error("unlock err", err)

    if (code === 0 && JSON.parse(out).unlocked) {
      state.data = state.data.filter(lock => lock.id !== id)
    } else if (err) {
      window.showErrorMessage(err)
    }
    return state.data
  })
}