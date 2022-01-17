export const setToken = (key: string, token: string): void => {
  if (window.localStorage) {
    localStorage.setItem(key, token);
  }
};

export const getToken = (key: string): string | null => {
  if (window.localStorage) {
    return localStorage.getItem(key);
  }

  return null;
};
