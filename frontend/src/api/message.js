import { ENDPOINT } from "../constants";

export const messageRequest = async ({
  attempt,
  body,
  method,
  headers,
  params = "",
}) =>
  await fetch(
    `${ENDPOINT}/api/message/${attempt}/${params}`,
    {
      method,
      headers,
      body,
    }
  );
