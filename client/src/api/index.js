import axios from "axios";
//https://heliverse-e9xm.onrender.com/api/
const API = axios.create({
  baseURL: "https://heliverse-e9xm.onrender.com/api/",
});

export const getUsers = async ({
  page = 1,
  limit = 20,
  search = "",
  gender = "",
  domain = "",
  availability = "",
}) =>
  await API.get(
    `/users?page=${page}&search=${search}&limit=${limit}&gender=${gender}&domain=${domain}&available=${availability}`
  );

export const getTeams = async () => await API.get(`/team/`);

export const createTeam = async ({
  team_name,
  team_description,
  team_members,
}) => await API.post(`/team/`, { team_name, team_description, team_members });
