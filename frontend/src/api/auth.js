import { ENDPOINT } from "../constants";

export const authRequest = async ({ attempt, body, method, headers }) =>
  await fetch(`${ENDPOINT}/api/auth/${attempt}`, {
    method,
    headers,
    body,
  });

export const userLogin = async (userCredentials) =>
  await fetch(`${ENDPOINT}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userCredentials),
  });
