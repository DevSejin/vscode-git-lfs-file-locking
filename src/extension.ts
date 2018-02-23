"use strict"
import { Uri, ExtensionContext } from "vscode"
import { State } from "./data"

import { window, workspace, commands } from "vscode"
import { GitLFSLocksTreeProvider, GitLFSLockTreeItem } from "./views/locks"
import { lock, unlock, locks } from "./actions"

export function activate(context: ExtensionContext) {
  const state: State = {
    type: "Initial",
    data: []
  }

  const tree = new GitLFSLocksTreeProvider(state.data)

  const lockCmd = (current?: Uri, selected?: Array<Uri>) => {
    if (!Array.isArray(selected)) return
    selected.map(file =>
      lock(workspace.asRelativePath(file.path), state).then(tree.render)
    )
  }

  const unlockCmd = (item: GitLFSLockTreeItem) => {
    if (!item) return
    unlock(item.id, false, state).then(tree.render)
  }
  const unlockForceCmd = (item: GitLFSLockTreeItem) => {
    if (!item) return
    unlock(item.id, true, state).then(tree.render)
  }

  const locksCmd = () => {
    locks(state).then(tree.render)
  }

  context.subscriptions.push(
    window.registerTreeDataProvider("gitLFSLocks", tree),
    commands.registerCommand("gitLFSFileLocking.lock", lockCmd),
    commands.registerCommand("gitLFSFileLocking.unlock", unlockCmd),
    commands.registerCommand("gitLFSFileLocking.unlockForce", unlockForceCmd),
    commands.registerCommand("gitLFSFileLocking.locks", locksCmd)
  )

  locks(state).then(tree.render)
}

export function deactivate() {}
