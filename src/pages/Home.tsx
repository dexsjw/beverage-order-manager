import { Stack } from "@mui/material";
import SessionForm from "../components/SessionForm";
import SortableTable from "../components/SortableTable";
import SessionUserForm from "../components/SessionUserForm";
import { useSessionContext } from "../context/SessionContext";

function Home() {
  const tableHeaders = [
    { id: "name", name: "Name" },
    { id: "owner", name: "Owner" },
    { id: "isActive", name: "Status" }
  ];
  const { sessions } = useSessionContext();

  return (
    <Stack spacing={5}>
      <SessionUserForm />
      <SessionForm />
      <SortableTable 
        tableTitle="Join A Session: " 
        tableHeaders={tableHeaders}
        tableData={sessions}
      />
    </Stack>
  )
}

export default Home;