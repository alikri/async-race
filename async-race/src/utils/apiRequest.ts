interface RequestOptions {
  endpoint: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: Record<string, string>;
  params?: URLSearchParams | Record<string, string>;
  headers?: Record<string, string>;
}

interface APIResponse<T = any> {
  data: T;
  error?: string;
}

async function makeApiRequest<T>({
  endpoint,
  method = 'GET',
  body,
  params = {},
  headers = {},
}: RequestOptions): Promise<APIResponse<T>> {
  const baseUrl = process.env.REACT_APP_API_URL as string;
  // eslint-disable-next-line no-console
  console.log(baseUrl);
  const url = new URL(endpoint, baseUrl);

  if (params instanceof URLSearchParams) {
    url.search = params.toString();
  } else {
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  }

  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...headers,
  };

  const options: RequestInit = {
    method,
    headers: defaultHeaders,
    body: body && method !== 'GET' ? JSON.stringify(body) : null,
  };

  try {
    const response = await fetch(url.toString(), options);
    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(errorBody.error || 'API request failed');
    }
    const responseData: T = await response.json();
    return { data: responseData };
  } catch (error) {
    console.error('API request error:', error);
    throw new Error(`Failed to fetch from ${endpoint}: ${error}`);
  }
}

export default makeApiRequest;
