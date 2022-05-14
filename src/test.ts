import { latest, random, lookup } from './index.js'
import type { color } from './types.js'

let array = (await latest()).slice(0, 3) as Array<color> // Get 3 latest names

for (let i = 0; i < 3; i++) { // Get 3 random colors
  array.push(await random())
} 
for (let hex of ['ffffff', '123456', '010101']) { // Lookup 3 colors
  array.push(await lookup(hex))
}

let formatted = array.map(item => // Format each color nicley
  `${item.name}${' '.repeat(30 - item.name.length)}` +
  `https://colornames.org/color/${item.hexCode}`
)

console.log(formatted.join('\n'))