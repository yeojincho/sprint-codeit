import {BASE_URL, TENANT_ID} from "./constants";

export const apiClient = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const res = await fetch(`${BASE_URL}/${TENANT_ID}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`API Error: ${res.status}`);
  }

  return res.json();
};
