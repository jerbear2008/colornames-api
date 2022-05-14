import { latest, random, lookup } from './index.js'
import type { color } from './types.js'

const latestColors = (await latest()).slice(0, 3)
console.log(latestColors)

let randomColors: Array<color> = []
for (let i = 0; i < 3; i++) { // Get 3 random colors
  randomColors.push(await random())
}
console.log(randomColors)

let specificColors: Array<color> = []
for (let hex of ['ffffff', '123456', '010101']) { // Lookup 3 colors
  specificColors.push(await lookup(hex))
}
console.log(specificColors)