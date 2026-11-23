const apiOrigin = (import.meta.env.VITE_API_URL || "http://localhost:3000").replace(/\/+$/, "");

export const API_BASE_URL = `${apiOrigin}/api`;

export function getImageUrl(path: string) {
  return `${apiOrigin}${path.startsWith("/") ? path : `/${path}`}`;
}

