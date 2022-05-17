export type color = {
  hexCode: string,
  name: string,
}
export type name = color & {
  nameID: number,
}

export type rawStats = {
  colorCount: number,
  nameCount: number,
}
export type stats = {
  totalColors: number,
  namedColors: number,
  portionNamed: number,
}