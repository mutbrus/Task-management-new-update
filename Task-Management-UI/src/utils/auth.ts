import axios from "axios";

const BASE_URL = 'http://localhost:3000/auth';

export async function authResponse() {
    const res = await axios.post(`${BASE_URL}/get_login`);
    console.log({res});
    return res.data;
}