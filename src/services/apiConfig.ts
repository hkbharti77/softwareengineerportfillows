/**
 * Global API Configuration
 * Resolves the API Base URL strictly from environment variables (VITE_API_URL or VITE_BACKEND_URL).
 * Prevents invalid localhost requests on public live domains (like hkbharti77.website).
 */
export const getApiBaseUrl = (): string => {
  const envUrl = (
    import.meta.env.VITE_API_URL ||
    import.meta.env.VITE_BACKEND_URL ||
    ''
  ).trim().replace(/\/+$/, '');

  const isBrowser = typeof window !== 'undefined';
  const isLocalHost = isBrowser && (
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname.endsWith('.local')
  );

  if (envUrl) {
    if (!isBrowser || isLocalHost) {
      return envUrl;
    }
    // Remote backend URL configured
    if (!envUrl.includes('localhost') && !envUrl.includes('127.0.0.1')) {
      return envUrl;
    }
    // On a public domain where localhost was set in build env, use relative path
    return '';
  }

  return isLocalHost ? 'http://localhost:5000' : '';
};

/**
 * Resolves full API endpoint path based solely on the environment configuration.
 * When no environment host is configured, returns relative endpoint for proxy / same-origin routing.
 */
export const getApiUrl = (endpointPath: string): string => {
  const base = getApiBaseUrl();
  const cleanPath = endpointPath.startsWith('/') ? endpointPath : `/${endpointPath}`;
  return base ? `${base}${cleanPath}` : cleanPath;
};
