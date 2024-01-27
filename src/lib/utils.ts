export async function ImageLoader(
  src: string,
  width: number,
  quality: number = 75,
) {
  return `http://localhost:3000/uploads/${src}?w=${width}&q=${quality}`;
}
