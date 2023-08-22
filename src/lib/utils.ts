export function image(url: string, quality?: number)  {
  if (quality && quality >= 0) {
    return `https:${url}?fm=webp&w=${quality}`;
  } else {
    return `https:${url}?fm=webp`;
  }
}
