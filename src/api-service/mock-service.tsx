import { AxiosResponse } from "axios";
import { Session } from "../type-interface/Session";
import mockApi from "./mock-api";
import { Dispatch, SetStateAction } from "react";

const URL_SESSIONS = "/sessions/";
const URL_SESSION_DETAILS = "/session-details/";
const URL_ORDERS = "/orders/";

export const getAllSessions = async () => {
  try {
    const response: AxiosResponse<Session[]> = await mockApi.get(URL_SESSIONS);
    const sessions: Session[] = response.data;
    return sessions;
  } catch (error) {
    console.error(error);
  }
}

export const getSession = async (sessionId: string) => {
  try {
    const response: AxiosResponse<Session> = await mockApi.get(URL_SESSION_DETAILS + sessionId);
    const session: Session = response.data;
    return session;
  } catch (error) {
    console.error(error);
  }
}