import { ENDPOINT } from "../constants";

export const userRequest = async ({ attempt, method, headers, params = "" }) =>
  await fetch(`${ENDPOINT}/api/user/${attempt}${params}`, {
    method,
    headers,
  });

export const searchUsers = async ({ accessToken, search }) =>
  await fetch(`${ENDPOINT}/api/user/searchUsers?user=${search}`, {
    method: "GET",
    headers: { authorization: `JWT ${accessToken}` },
  });
