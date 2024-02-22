import * as colornames from './index.ts'

function assert(condition: unknown, msg?: string): asserts condition {
  if (!condition) {
    throw new Error(msg ?? 'Assertion failed')
  }
}

Deno.test('Get latest 3 colors', async () => {
  const latestColors = (await colornames.latest()).slice(0, 3)
  console.log('Latest 3:', latestColors)
  assert(latestColors.length === 3)
})

Deno.test('Get 3 random colors', async () => {
  const randomColors: colornames.color[] = []
  for (let i = 0; i < 3; i++) {
    randomColors.push(await colornames.random())
  }
  console.log('Random 3:', randomColors)
  assert(randomColors.length === 3)
})

Deno.test('Lookup 3 specific colors', async () => {
  const specificColors: colornames.color[] = []
  for (const hex of ['Ff0000', '#123456', '010101']) {
    specificColors.push(await colornames.lookup(hex))
  }
  console.log('Specfic 3:', specificColors)
  assert(specificColors.length === 3)
})

Deno.test('Get count of colors with a specific name', async () => {
  const existingColorCount = await colornames.nameCount('Elmo')
  console.log(`There are at least ${existingColorCount} colors named Elmo.`)
  assert(typeof existingColorCount === 'number')
  assert(existingColorCount > 0)

  const fakeColor = `Fake Color ${Math.round(Math.random() * 1e8)}`
  const fakeColorCount = await colornames.nameCount(fakeColor)
  console.log(`There are ${fakeColorCount} colors named ${fakeColor}.`)
  assert(typeof fakeColorCount === 'number')
  assert(fakeColorCount === 0)
})

Deno.test('Get percent of all colors named', async () => {
  const stats = await colornames.stats()
  const percent = stats.portionNamed * 100
  console.log(`${percent.toFixed(2)}% of all colors have been named.`)
  assert(typeof percent === 'number')
})

// Uncomment below tests if needed
// Deno.test("Upvote a name", async () => {
//   const upvoteResult = await colornames.upvote(3938638);
//   console.log(`Upvote color succeeded: ${upvoteResult}`);
//   assertEquals(typeof upvoteResult, 'boolean');
// });

// Deno.test("Submit a name", async () => {
//   const submitResult = await colornames.submitName('d47904', 'Rotten Jack O Lantern');
//   console.log(`Submit name succeeded: ${submitResult}`);
//   assertEquals(typeof submitResult, 'boolean');
// });
