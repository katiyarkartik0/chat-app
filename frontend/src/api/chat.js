export const chatRequest = async ({ attempt, method,headers }) =>
  await fetch(`http://localhost:5000/api/chat/${attempt}`, {
    method,
    headers,
  });
