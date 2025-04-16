import { Stack } from "@mui/material";
import SessionForm from "../components/SessionForm";
import SortableTable from "../components/SortableTable";

function Home() {
  return (
    <Stack spacing={5}>
      <SessionForm />
      <SortableTable tableTitle="Join A Session: "/>
    </Stack>
  )
}

export default Home;