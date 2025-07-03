import axios from "axios";

const MOCK_BASE_URL = "http://localhost:3003";
const mockApi = axios.create({ baseURL: MOCK_BASE_URL });

export default mockApi;