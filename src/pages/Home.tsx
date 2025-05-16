import { Stack } from "@mui/material";
import SessionForm from "../components/SessionForm";
import SessionUserForm from "../components/SessionUserForm";
import SortableTable from "../components/SortableTable";
import { useSessionContext } from "../context/SessionContext";
import { SessionTableData } from "../type-interface/Session";
import { TableHeader } from "../type-interface/props/SortableTableProps";

function Home() {
  const sessionTableHeaders: TableHeader<SessionTableData>[] = [
    { id: "name", name: "Name" },
    { id: "owner", name: "Owner"},
    { id: "isActive", name: "Status" }
  ];
  const { sessions } = useSessionContext();
  const sessionTableDataArray: SessionTableData[] = sessions.map(session => ({
    id: session.id,
    name: session.name,
    owner: session.owner.name,
    isActive: session.isActive ? "Active" : "Closed"
  }))

  return (
    <Stack spacing={5}>
      <SessionUserForm />
      <SessionForm />
      <SortableTable<SessionTableData> 
        tableTitle="Join A Session: " 
        tableHeaders={sessionTableHeaders}
        tableData={sessionTableDataArray}
      />
    </Stack>
  )
}

export default Home;