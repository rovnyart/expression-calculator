export const expressionRegex = /[^0-9+*/-\s]/gi;

/* Simple fetch wrapper to handle non-200 status codes and throw errors.
It's not pretty much reused in this app, just added it for code readability =) */
export const fetcher = async (path: string, options: RequestInit = {}) => {
  const response = await fetch(path, options);

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error);
  }

  return result;
};
