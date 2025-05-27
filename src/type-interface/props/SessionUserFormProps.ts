import { SessionUser } from "../SessionUser"

export type SessionUserFormProps = {
  sessionUser: SessionUser,
  handleSessionUserChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}