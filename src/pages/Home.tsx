import { Stack } from "@mui/material";
import { ChangeEvent, Key, useEffect, useState } from "react";
import { getAllSessions } from "../api-service/mock-service";
import JoinSessionDialog from "../components/JoinSessionDialog";
import SessionForm from "../components/SessionForm";
import SessionUserForm from "../components/SessionUserForm";
import SortableTable from "../components/SortableTable";
import { Session, SessionTableData } from "../type-interface/Session";
import { SessionUser } from "../type-interface/SessionUser";
import { TableHeader } from "../type-interface/props/SortableTableProps";

const BOM_SESSION_USER_KEY = "bomSessionUserKey";
let currentSessionUser: SessionUser = { id: "", name: "" };
const emptySessionCredentials: Pick<Session, "id" | "name" | "password"> = {
  id: "",
  name: "",
  password: ""
}

function Home() {
  const existingSessionUser = localStorage.getItem(BOM_SESSION_USER_KEY);
  const newSessionUser: SessionUser = { id: crypto.randomUUID(), name: "" };

  try {
    currentSessionUser = existingSessionUser
      ? JSON.parse(existingSessionUser)
      : newSessionUser;
    if (!currentSessionUser.id || currentSessionUser.id.trim() === "") {
      console.warn("Removing key...");
      localStorage.removeItem(BOM_SESSION_USER_KEY);
      currentSessionUser = newSessionUser;
    }
  } catch (error) {
    console.error(error);
    localStorage.removeItem(BOM_SESSION_USER_KEY);
  }
  
  const [sessionUser, setSessionUser] = useState(currentSessionUser);
  const [sessionCredentials, setSessionCredentials] = useState<Pick<Session, "id" | "name" | "password">>(emptySessionCredentials);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    retrieveAllSessions();
  }, []);

  const retrieveAllSessions = async () => {
    const allSessions = await getAllSessions();
    if (allSessions) {
      setSessions(allSessions);
    } else {
      console.error("Error retrieving all Sessions");
    }
  }

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

  const handleSessionUserChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSessionUser(prevSessionUser => {
      const newSessionUser: SessionUser = {
        ...prevSessionUser,
        [event.target.name]: event.target.value
      };
      localStorage.setItem(BOM_SESSION_USER_KEY, JSON.stringify(newSessionUser));
      return newSessionUser;
    })
  }

  const handleSessionSelect = (sessionId: Key) => {
    const session = sessions.find(session => session.id === sessionId);
    if (session !== undefined) {
      setSessionCredentials({
        id: session.id,
        name: session.name,
        password: session.password
      })
      setIsDialogOpen(true);
    }
  }

  const handleDialogClose = () => {
    setSessionCredentials(emptySessionCredentials);
    setIsDialogOpen(false);
  }

  return (
    <Stack spacing={5}>
      <SessionUserForm 
        sessionUser={sessionUser}
        handleSessionUserChange={handleSessionUserChange}
      />
      <SessionForm 
        sessionUser={sessionUser}
      />
      <SortableTable<SessionTableData> 
        tableTitle="Join A Session: " 
        tableHeaders={sessionTableHeaders}
        tableData={sessionTableData}
        selectedRowId={sessionCredentials.id}
        handleRowSelect={handleSessionSelect}
      />
      <JoinSessionDialog
        sessionCredentials={sessionCredentials}
        isDialogOpen={isDialogOpen}
        handleDialogClose={handleDialogClose}
      />
    </Stack>
  )
}

export default Home;