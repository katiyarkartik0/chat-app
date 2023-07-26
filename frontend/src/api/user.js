import { ENDPOINT } from "../constants";

export const userRequest = async ({ attempt, method, headers, params = "" }) =>
  await fetch(`${ENDPOINT}/api/user/${attempt}${params}`, {
    method,
    headers,
  });
