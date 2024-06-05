
const baseURL = "http://localhost:57678";

export const fetcher = async (action: string) => {
  const res = await fetch(baseURL + action, {
  });

  if (!res.ok) {
    if (res.status === 401 || res.status === 403) {
    }
  }

  return res.json();
};
