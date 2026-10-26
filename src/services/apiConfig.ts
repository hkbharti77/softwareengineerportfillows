/**
 * Global API Configuration
 * Resolves the API Base URL strictly from environment variables (VITE_API_URL or VITE_BACKEND_URL).
 * Absolutely NO hardcoded fallback domains or ports.
 */
export const getApiBaseUrl = (): string => {
  const envUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_BACKEND_URL || '';
  return envUrl.replace(/\/+$/, '');
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
