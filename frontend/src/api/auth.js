import { ENDPOINT } from "../constants";

export const authRequest = async ({ attempt, body, method, headers }) =>
  await fetch(`${ENDPOINT}/api/auth/${attempt}`, {
    method,
    headers,
    body,
  });
