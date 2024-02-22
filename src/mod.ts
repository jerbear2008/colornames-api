import type { color, name, statsInfo } from './types.ts'
export type { color, name, statsInfo } from './types.ts'

const domain = 'https://colornames.org'

/**
 * Generic error when using the colornames API.
 */
export class ColornamesError extends Error {
  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
  }
}

/**
 * Looks up a color by its hex code.
 * @param hex The hex code of the color to look up. Case insensitive, with or without the leading #.
 * @returns A color object with the hex code and name, if any.
 */
export async function lookup(hex: string): Promise<color> {
  const cleanHex = hex.replace(/^#/, '').toLowerCase()
  const url = new URL('/search/json', domain)
  url.searchParams.set('hex', cleanHex)
  const res = await fetch(url.href)

  const info = await res.json() as color
  return info
}

/**
 * Gets a random color.
 * @returns A color object with the hex code and name, if any.
 */
export async function random(): Promise<color> {
  const url = new URL('/random/json', domain)
  const res = await fetch(url.href)

  const info = await res.json() as color
  return info
}

/**
 * Gets the latest proposed names for colors.
 * @returns An array of name objects, each with a hex code, name, and nameID.
 */
export async function latest(): Promise<name[]> {
  const url = new URL('/fresh/json', domain)
  const res = await fetch(url.href)

  const latest = await res.json() as name[]
  return latest
}

/**
 * Gets many colors the given name has been proposed for.
 * **Note**: Very often undercounts, but it is reliable to see if a name has already
 * been proposed.
 * @param name Name to check
 * @returns Number of colors with that name
 */
export async function nameCount(name: string): Promise<number> {
  const url = new URL('/ajax/nameCount/', domain)
  const formData = new URLSearchParams()
  formData.append('proposedName', name)
  const res = await fetch(url.href, {
    method: 'POST',
    body: formData,
  })
  const count = parseInt(await res.text())
  return count
}

/**
 * Gets statistics for the colornames database.
 * @returns An object with stats about the database.
 */
export async function stats(): Promise<statsInfo> {
  const url = new URL('/ajax/stats.json', domain)
  const res = await fetch(url.href)

  const raw = await res.json() as {
    colorCount: number
    nameCount: number
  }
  const stats = {
    totalColors: raw.colorCount,
    namedColors: raw.nameCount,
    portionNamed: raw.nameCount / raw.colorCount,
  } as statsInfo
  return stats
}

/**
 * Error for when a nameID is not found.
 */
export class InvalidNameError extends ColornamesError {
  constructor(nameID: number) {
    super(`NameID ${nameID} not found.`)
  }
}

async function vote(
  name: number | name,
  type: 'upvote' | 'downvote' | 'report',
) {
  if (typeof name === 'object') name = name.nameId
  const url = new URL(`/ajax/${type}/`, domain)
  const formData = new URLSearchParams({
    naming: String(name),
  })
  const res = await fetch(url.href, {
    method: 'POST',
    headers: {
      referer: domain,
    },
    body: formData,
  })
  const result = await res.text()
  switch (result) {
    case 'Success':
      return true
    case 'Already voted':
      return false
    case 'Unable to determine color':
      throw new InvalidNameError(name)
    case 'Vauge error':
    default:
      throw new ColornamesError(
        `Tried to ${type} nameID ${name}, got an error: "${result}"`,
      )
  }
}
/**
 * Upvotes the proposed name for a color.
 * @returns True if the vote was successful, false if the user has already voted.
 * @throws InvalidNameError if the nameID is not found.
 * @throws ColornamesError if the vote fails for any other reason.
 */
export async function upvote(name: number | name): Promise<boolean> {
  return await vote(name, 'upvote')
}
/**
 * Downvotes the proposed name for a color.
 * @returns True if the vote was successful, false if the user has already voted.
 * @throws InvalidNameError if the nameID is not found.
 * @throws ColornamesError if the vote fails for any other reason.
 */
export async function downvote(name: number | name): Promise<boolean> {
  return await vote(name, 'downvote')
}
/**
 * Reports the proposed name for a color.
 * @returns True if the report was successful, false if the user has already reported.
 * @throws InvalidNameError if the nameID is not found.
 * @throws ColornamesError if the report fails for any other reason.
 */
export async function report(name: number | name): Promise<boolean> {
  return await vote(name, 'report')
}

/**
 * Submits a proposed name for a color.
 * @param color The color to name, or its hex code.
 * @param name The proposed name.
 * @returns True if the submission was successful, false if the name has already been proposed.
 * @throws ColornamesError if the submission fails for any other reason.
 */
export async function submitName(
  color: color | string,
  name: string,
): Promise<boolean> {
  if (typeof color === 'object') color = color.hexCode
  const url = new URL('/ajax/submit/', domain)
  const formData = new URLSearchParams({
    colorId: String(parseInt(color, 16) + 1),
    proposedName: name,
  })
  const res = await fetch(url.href, {
    method: 'POST',
    headers: {
      referer: domain,
    },
    body: formData,
  })
  const result = await res.text()

  const successRegex = /Thanks! This color will now be known as/
  if (successRegex.test(result)) return true
  const duplicateRegex =
    /Error: that name has already been proposed for this color\./
  if (duplicateRegex.test(result)) return false
  throw new ColornamesError(
    `Tried to submit "${name}" as a name for the color ${color},  got an error: "${result}"`,
  )
}
