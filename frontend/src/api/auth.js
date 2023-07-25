export const authRequest = async ({ attempt, body, method, headers }) =>
  await fetch(`http://localhost:5000/api/auth/${attempt}`, {
    method,
    headers,
    body,
  });
