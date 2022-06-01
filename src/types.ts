export type color = {
  hexCode: string,
  name: string | null,
}
export type name = color & {
  nameID: number,
}

export type stats = {
  totalColors: number,
  namedColors: number,
  portionNamed: number,
}