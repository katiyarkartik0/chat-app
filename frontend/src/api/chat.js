import { ENDPOINT } from "../constants";

export const chatRequest = async ({
  attempt,
  method,
  headers,
  body,
  params = "",
}) =>
  await fetch(`${ENDPOINT}/api/chat/${attempt}${params}`, {
    method,
    headers,
    body,
  });
