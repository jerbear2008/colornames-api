import colornames from './index.js'

const white = await colornames.lookup('ffffff')
console.log(`#ffffff: ${white.name}`)
// -> #ffffff: White

const randomColor = await colornames.random()
console.log(`#${randomColor.hexCode}: ${randomColor.name}`)
// example output:
// -> #e44c4a: Makes Me Hungry Orange

const latest = (await colornames.latest())[0]
const upvoteResult = true // await colornames.upvote(latest) // avoid actually upvoting
console.log(upvoteResult ? 'upvoted' : 'failed to upvote', latest)
// example output:
// -> upvoted { hexCode: 'b9484b', name: 'Stale Cherry', nameID: 4256977 }