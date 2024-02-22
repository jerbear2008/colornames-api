/**
 * Represents a color and its name, if any.
 */
export type color = {
  hexCode: string
  name: string | null
}
/**
 * Represents a specific proposed name for a color. Can be used to vote on the name.
 */
export type name = color & {
  nameId: number
}

/**
 * Statistics about the colornames database.
 */
export type statsInfo = {
  /** Total number of possible colors in the RGB color space. Equal to 2^(3*8) or 16777216. */
  totalColors: 0x1000000
  /** Total number of colors with names */
  namedColors: number
  /** A decimal between 0 and 1 representing the portion of colors with names */
  portionNamed: number
}
