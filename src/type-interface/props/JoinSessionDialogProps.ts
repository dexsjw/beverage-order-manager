export type JoinSessionDialogProps = {
  sessionId: string
  sessionName: string,
  isDialogOpen: boolean,
  onDialogClose: (isDialogOpen: boolean) => void
}