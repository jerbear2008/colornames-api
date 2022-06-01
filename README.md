# colornames-api
A simple package for interacting with the [colornames.org](https://colornames.org) api. Written in [fully typed](/src/types.ts) TypeScript.

```ts
import colornames from 'colornames-api'

const white = await colornames.lookup('ffffff')
console.log(`#ffffff: ${white.name}`)
// -> #ffffff: White

const randomColor = await colornames.random()
console.log(`#${randomColor.hexCode}: ${randomColor.name}`)
// example output:
// -> #e44c4a: Makes Me Hungry Orange

const latest = (await colornames.latest())[0]
const upvoteResult = await colornames.upvote(latest)
console.log(upvoteResult ? 'upvoted' : 'failed to upvote', latest)
// example output:
// -> upvoted { hexCode: 'b9484b', name: 'Stale Cherry', nameID: 4256977 }
```

## Usage

### ES Modules
With import (types included):
```ts
import colornames from 'colornames-api'
...
```
Import specific functions or types:
```ts
import { lookup as nameLookup, type color } from 'colornames-api'
...
```
### CommonJS
In CommonJS, this module must be imported with `import()`, which is asynchronous. However, CommonJS does not allow top-level await.

Using an asynchronous `main()` function:
```js
async function main() {
  const { default: colornames } = await import('./out/index.js')
  ...
}

main()
```
Using `import().then`:
```ts
import('./out/index.js').then(async ({ default: colornames }) => {
  ...
})
```

## Documentation

### `async lookup(hex: string): color`
Returns the details of a specific color as a `color`. The `color.name` value may be null if the color has not been named.
```ts
const white = await colornames.lookup('ffffff')
// -> {
//      hexCode: 'ffffff',
//      name: 'White',
//    }
```

### `async random(): color`
Returns the details of a random named color as a `color`.
```ts
const randomColor = await colornames.random()
// -> {
//      hexCode: 'e44c4a',
//      name: 'Makes Me Hungry Orange',
//    }
```

### `async latest(): name[]`
Returns an array of the latest 100 names as a `name[]`.
```ts
const latest = await colornames.latest()
console.log(latest.length)
// -> 100
console.log(latest[0])
// example output:
// -> {
//      hexCode: 'b9484b',
//      name: 'Stale Cherry',
//      nameID: 4256977,
//    }
```

### `async nameCount(name: string): number`
Returns how many colors the given name has been proposed for.
```ts
const redCount = await colornames.nameCount('Red')
// example value:
// -> 1661
```

### `async stats(): stats`
Returns statistics about how many colors have been named as a `stats` object.
```ts
const stats = await colornames.stats()
// example value:
// -> {
//      totalColors: 16777216,
//      namedColors: 2964995,
//      portionNamed: 0.17672747373580933,
//    }
```

### `async upvote(name: number | name): boolean`
### `async downvote(name: number | name): boolean`
### `async report(name: number | name): boolean`
Upvotes, downvotes, or reports a given name. Returns `true` if the vote was successful or `false` if a vote has already been cast on the color from the current IP address. If the `name` is invalid, an `InvalidNameError` will be thrown.
```ts
const upvoteResult = await colornames.upvote(3938638)
// example value:
// -> true
```

### `async submitName(color: color | string, name: string)`
Submits a name for a color. Returns `true` if the submission was successful ot `false` if the name had already been submitted.
```ts
const submitResult = await colornames.submitName('d47904', 'Rotten Jack O Lantern')
// example value:
// -> false
```