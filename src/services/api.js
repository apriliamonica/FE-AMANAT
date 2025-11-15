// Simple API client placeholder
export const api = {
  get: async (url) => {
    const res = await fetch(url);
    return res.json();
  },
};
