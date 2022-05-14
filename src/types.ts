export type color = {
  hexCode: string,
  name: string,
}
export type name = color & {
  nameId: number,
}