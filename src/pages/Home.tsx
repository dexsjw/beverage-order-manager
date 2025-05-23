import { Stack } from "@mui/material";
import SessionForm from "../components/SessionForm";
import SessionUserForm from "../components/SessionUserForm";
import SortableTable from "../components/SortableTable";
import { useSessionContext } from "../context/SessionContext";
import { SessionTableData } from "../type-interface/Session";
import { TableHeader } from "../type-interface/props/SortableTableProps";
import { Key, useState } from "react";
import JoinSessionDialog from "../components/JoinSessionDialog";

function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(true);

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
    console.log(session);
  }

  return (
    <Stack spacing={5}>
      <SessionUserForm />
      <SessionForm />
      <SortableTable<SessionTableData> 
        tableTitle="Join A Session: " 
        tableHeaders={sessionTableHeaders}
        tableData={sessionTableData}
        onRowSelect={onSessionSelect}
      />
      <JoinSessionDialog 
        sessionName="name"
        isDialogOpen={isDialogOpen}
      />
    </Stack>
  )
}

export default Home;