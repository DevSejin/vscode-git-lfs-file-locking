import { Lock } from "./services/git/lfs"

interface InitialListState<A> {
  type: "Initial",
  data: Array<A>
}
interface PendingListState<A> {
  type: "Pending"
  timestamp: number
  data: Array<A>
}
interface InvalidListState<A> {
  type: "Invalid"
  timestamp: number
  error: string
  data: Array<A>
}
interface ValidListState<A> {
  type: "Valid"
  timestamp: number
  data: Array<A>
}
type ListState<A> =
  | InitialListState<A>
  | PendingListState<A>
  | InvalidListState<A>
  | ValidListState<A>

export type State = ListState<Lock>