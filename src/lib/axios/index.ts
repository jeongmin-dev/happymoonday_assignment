import axios from "axios";

const authApi = axios.create();

authApi.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

export default authApi;
