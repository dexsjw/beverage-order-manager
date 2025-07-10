import { AxiosResponse } from "axios";
import { Session } from "../type-interface/Session";
import mockApi from "./mock-api";
import { Order } from "../type-interface/Order";

const URL_SESSIONS = "/sessions/";
const URL_ORDERS = "/orders/";

/*      URL_SESSIONS     */
export const mockGetAllSessions = async () => {
  try {
    const response: AxiosResponse<Session[]> = await mockApi.get(URL_SESSIONS);
    const sessions: Session[] = response.data;
    return sessions;
  } catch (error) {
    console.error(error);
  }
}

export const mockGetSession = async (sessionId: string) => {
  try {
    const response: AxiosResponse<Session> = await mockApi.get(URL_SESSIONS + sessionId);
    const sessionDetails: Session = response.data;
    return sessionDetails;
  } catch (error) {
    console.error(error);
  }
}

export const mockPostSession = async (session: Session) => {
  try {
    const response: AxiosResponse<Session> = await mockApi.post(URL_SESSIONS, session);
    const sessionDetails: Session = response.data;
    return sessionDetails;
  } catch (error) {
    console.error(error);
  }
}

export const mockPutSession = async (sessionId: string, session: Session) => {
  try {
    const response: AxiosResponse<Session> = await mockApi.put(URL_SESSIONS + sessionId, session);
    const sessionDetails: Session = response.data;
    return sessionDetails;
  } catch (error) {
    console.error(error);
  }
}

/*      URL_ORDERS     */
// export const mockGetOrder = async (orderId: string) => {
//   try {
//     const response: AxiosResponse<Order> = await mockApi.get(URL_ORDERS + orderId);
//     const mockOrder: Order = response.data;
//     return mockOrder;
//   } catch (error) {
//     console.error(error);
//   }
// }

export const mockPostOrder = async (order: Order) => {
  try {
    const response: AxiosResponse<Order> = await mockApi.post(URL_ORDERS, order);
    const mockOrder: Order = response.data;
    return mockOrder;
  } catch (error) {
    console.error(error);
  }
}

export const mockPutOrder = async (orderId: string, order: Order) => {
  try {
    const response: AxiosResponse<Order> = await mockApi.put(URL_ORDERS + orderId, order);
    const mockOrder: Order = response.data;
    return mockOrder;
  } catch (error) {
    console.error(error);
  }
}

export const mockDeleteOrder = async (orderId: string) => {
  try {
    const response: AxiosResponse<Order> = await mockApi.delete(URL_ORDERS + orderId);
    const mockOrder: Order = response.data;
    return mockOrder;
  } catch (error) {
    console.error(error);
  }
}