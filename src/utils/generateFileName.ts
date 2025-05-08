export function generateFileName(
  imageName: string,
  width: number | null,
  height: number | null,
): string {
  let name = imageName;
  if (width !== null && width !== undefined) name += `-w${width}`;
  if (height !== null && height !== undefined) name += `-h${height}`;
  return `${name}.jpg`;
}
