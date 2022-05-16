import * as colornames from './index.js';
const latestColors = (await colornames.latest()).slice(0, 3);
console.log('Latest 3:', latestColors);
let randomColors = [];
for (let i = 0; i < 3; i++) { // Get 3 random colors
    randomColors.push(await colornames.random());
}
console.log('Random 3:', randomColors);
let specificColors = [];
for (let hex of ['ffffff', '123456', '010101']) { // Lookup 3 colors
    specificColors.push(await colornames.lookup(hex));
}
console.log('Specfic 3:', specificColors);
const redCount = await colornames.nameCount('Red'); // Get count of colors named Red
console.log(`There are ${redCount} colors named Red.`);
const stats = await colornames.stats(); // Get percent of colors named
const percent = stats.portionNamed * 100;
console.log(`${percent}% of all colors have been named.`);
const upvoteResult = await colornames.upvote(3938638 /* #d47904 */); // Upvote a name
console.log(`Upvote color succeeded: ${upvoteResult}`);
