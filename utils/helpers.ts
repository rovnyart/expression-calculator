export const expressionRegex = /[^0-9+*/-\s]/gi;

type FetcherOptions = {
  method?: string;
  body?: any;
  headers?: Record<string, string>
};

/* Quick and simple fetch wrapper to handle non-200 status codes and throw errors.
It's not pretty much reused in this app, just added it for code readability =) */
export const fetcher = async (path: string, options: FetcherOptions = {}) => {
  const response = await fetch(path, {
    method: options.method,
    body: options.body,
    headers: options.headers,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error);
  }

  return result;
};
