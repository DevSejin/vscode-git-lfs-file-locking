import {
  TreeDataProvider,
  ProviderResult,
  TreeItemCollapsibleState
} from "vscode"
import { Lock } from "../../services/git/lfs"

import { TreeItem, EventEmitter } from "vscode"

export class GitLFSLockTreeItem extends TreeItem {
  id: string
  label: string

  constructor(lock: Lock, collapsibleState?: TreeItemCollapsibleState) {
    const label = `${lock.path} (${lock.owner.name})`
    super(label, collapsibleState)

    this.contextValue = "gitLFSLock"
    this.id = lock.id
    this.label = label
  }

  static of(lock: Lock) {
    return new GitLFSLockTreeItem(lock)
  }
}

type TreeChildren = ProviderResult<Array<GitLFSLockTreeItem>>

export class GitLFSLocksTreeProvider
  implements TreeDataProvider<GitLFSLockTreeItem> {
  locks: Array<Lock>

  onDidChangeTreeDataEmmiter = new EventEmitter<GitLFSLockTreeItem | null>()
  onDidChangeTreeData = this.onDidChangeTreeDataEmmiter.event

  constructor(locks: Array<Lock>) {
    this.locks = locks
  }
  render = (locks: Array<Lock>) => {
    this.locks = locks
    this.onDidChangeTreeDataEmmiter.fire()
  }
  getTreeItem(element: GitLFSLockTreeItem): TreeItem {
    return element
  }
  getChildren(element?: GitLFSLockTreeItem): TreeChildren {
    return this.locks.map(GitLFSLockTreeItem.of)
  }
}
