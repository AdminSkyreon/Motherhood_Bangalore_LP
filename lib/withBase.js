// Prefixes root-relative paths with the deployment base path (e.g. "/Motherhood_Bangalore_LP"
// on GitHub Pages). Empty by default, so local dev and custom domains are unaffected.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function withBase(path) {
  if (typeof path !== 'string') return path;
  if (!path.startsWith('/') || path.startsWith('//')) return path;
  return `${BASE_PATH}${path}`;
}
