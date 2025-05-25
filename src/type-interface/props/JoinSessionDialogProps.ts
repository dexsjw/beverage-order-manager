import { Session } from "../Session"

export type JoinSessionDialogProps = {
  sessionCredentials: Pick<Session, "id" | "name" | "password">,
  isDialogOpen: boolean,
  onDialogClose: (isDialogOpen: boolean) => void
}