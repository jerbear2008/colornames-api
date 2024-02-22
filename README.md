# Colornames API

A simple package for interacting with the [Colornames](https://colornames.org)
API. Colornames is a crowdsourced database of color names, with the goal of
naming every possible RGB color.

```ts
import * as colornames from 'jsr:@jer/colornames'

const color = await colornames.lookup('ff0000')
color.name // -> 'Red'

const randomColor = await colornames.random()
// -> { hexCode: 'e44c4a', name: 'Makes Me Hungry Orange' }

const latest = (await colornames.latest())[0]
// -> { hexCode: 'b9484b', name: 'Stale Cherry', nameID: 4256977 }
```

All functions and types have JSDoc comments, hover over them in your editor or
see the [documentation](https://jsr.io/@jer/colornames/doc) for more.

# Links

- [Documentation](https://jsr.io/@jer/colornames/doc)
- [GitHub](https://github.com/jerbear2008/colornames-api)
- [JSR](https://jsr.io/@jer/colornames)
- [NPM](https://www.npmjs.com/package/colornames-api)

If you have any questions, feel free to send me a
[Matrix](https://matrix.to/#/@jerbear:beeper.com) or
[Discord](https://discord.gg/nJDk3s8Stp) (jerbear4328) message.

# License

This package is licensed under the
[MIT License](https://github.com/jerbear2008/colornames-api/blob/main/LICENSE).
If you use this package for somthing cool, please let me know!
