import { Stack } from "@mui/material";
import SessionForm from "../components/SessionForm";
import SessionUserForm from "../components/SessionUserForm";
import SortableTable from "../components/SortableTable";
import { useSessionContext } from "../context/SessionContext";
import { Session, SessionTableData } from "../type-interface/Session";
import { TableHeader } from "../type-interface/props/SortableTableProps";
import { Key, useState } from "react";
import JoinSessionDialog from "../components/JoinSessionDialog";

const emptySessionCredentials = {
  id: "",
  name: "",
  password: ""
}

function Home() {
  const [sessionCredentials, setSessionCredentials] = useState<Pick<Session, "id" | "name" | "password">>(emptySessionCredentials);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { sessions } = useSessionContext();
  const sessionTableData: SessionTableData[] = sessions.map(session => ({
    id: session.id,
    name: session.name,
    owner: session.owner.name,
    isActive: session.isActive ? "Active" : "Closed"
  }))
  
  const sessionTableHeaders: TableHeader<SessionTableData>[] = [
    { id: "name", name: "Name" },
    { id: "owner", name: "Owner"},
    { id: "isActive", name: "Status" }
  ];

  const onSessionSelect = (sessionId: Key) => {
    const session = sessions.find(session => session.id === sessionId);
    if (session !== undefined) {
      setSessionCredentials({
        id: session.id,
        name: session.name,
        password: session.password
      })
      setIsDialogOpen(prevDialogState => !prevDialogState);
    }
  }

  const handleDialogClose = (dialogState: boolean) => {
    setSessionCredentials(emptySessionCredentials);
    setIsDialogOpen(!dialogState);
  }

  return (
    <Stack spacing={5}>
      <SessionUserForm />
      <SessionForm />
      <SortableTable<SessionTableData> 
        tableTitle="Join A Session: " 
        tableHeaders={sessionTableHeaders}
        tableData={sessionTableData}
        selectedRowId={sessionCredentials.id}
        onRowSelect={onSessionSelect}
      />
      <JoinSessionDialog
        sessionCredentials={sessionCredentials}
        isDialogOpen={isDialogOpen}
        onDialogClose={handleDialogClose}
      />
    </Stack>
  )
}

export default Home;