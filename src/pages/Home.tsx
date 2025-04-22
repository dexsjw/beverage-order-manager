import { Stack } from "@mui/material";
import SessionForm from "../components/SessionForm";
import SortableTable from "../components/SortableTable";
import SessionUserForm from "../components/SessionUserForm";

function Home() {
  return (
    <Stack spacing={5}>
      <SessionUserForm />
      <SessionForm />
      <SortableTable tableTitle="Join A Session: "/>
    </Stack>
  )
}

export default Home;