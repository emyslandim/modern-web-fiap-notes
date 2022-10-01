import axios from "axios";

export const api = axios.create({
  baseURL: `http://fiap-notes-api.herokuapp.com`,
});
