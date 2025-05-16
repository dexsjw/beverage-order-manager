import { Stack } from "@mui/material";
import SessionForm from "../components/SessionForm";
import SessionUserForm from "../components/SessionUserForm";
import SortableTable from "../components/SortableTable";
import { useSessionContext } from "../context/SessionContext";
import { Session } from "../type-interface/Session";
import { TableHeader } from "../type-interface/props/SortableTableProps";

function Home() {
  const tableHeaders: TableHeader<Session>[] = [
    { id: "name", name: "Name" },
    { id: "owner", name: "Owner"},
    { id: "isActive", name: "Status" }
  ];
  const { sessions } = useSessionContext();

  return (
    <Stack spacing={5}>
      <SessionUserForm />
      <SessionForm />
      <SortableTable<Session> 
        tableTitle="Join A Session: " 
        tableHeaders={tableHeaders}
        tableData={sessions}
      />
    </Stack>
  )
}

export default Home;