import { AxiosResponse } from "axios";
import { Session } from "../type-interface/Session";
import mockApi from "./mock-api";
import { Dispatch, SetStateAction } from "react";

const URL_SESSIONS = "/sessions/";
const URL_SESSION_DETAILS = "/session-details/";
const URL_ORDERS = "/orders/";

export const getAllSessions = async (setStateFunction: Dispatch<SetStateAction<Session[]>>) => {
  try {
    const response: AxiosResponse<Session[]> = await mockApi.get(URL_SESSIONS);
    const sessions: Session[] = response.data;
    setStateFunction(sessions);
  } catch (error) {
    console.error(error);
  }
}