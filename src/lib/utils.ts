// Image utilities
export function image(url: string | undefined, quality?: number)  {
  if (quality && quality >= 0) {
    return `https:${url}?fm=webp&w=${quality}`;
  } else {
    return `https:${url}?fm=webp`;
  }
}

// Extracts a spotify podcast id from the url
export function extractSpotifyId(url: string) {
  const regex = /\/episode\/([A-Za-z0-9]+)\?/;
  return url.match(regex)?.[1];
}

// Clamps a number to a range
export function clamp(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max);
}
