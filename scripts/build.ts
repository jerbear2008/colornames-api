import { build, emptyDir } from 'https://deno.land/x/dnt@0.37.0/mod.ts'

const denoJson = JSON.parse(
  await Deno.readTextFile('./deno.json'),
) as typeof import('../deno.json')

await emptyDir('./npm')

await build({
  entryPoints: ['./src/mod.ts'],
  outDir: './npm',
  shims: {
    deno: {
      test: 'dev',
    },
  },
  package: {
    // package.json properties
    name: denoJson.npmPackage,
    version: denoJson.version,
    description: denoJson.description,
    license: denoJson.license,
    repository: {
      type: 'git',
      url: `git+${denoJson.repository}.git`,
    },
    bugs: {
      url: `${denoJson.repository}/issues`,
    },
    homepage: denoJson.repository,
  },

  postBuild() {
    // steps to run after building and before running the tests
    Deno.copyFileSync('LICENSE', 'npm/LICENSE')
    Deno.writeTextFileSync(
      'npm/README.md',
      Deno.readTextFileSync('README.md').replace(
        ` from '${denoJson.name}'`,
        ` from '${denoJson.npmPackage}'`,
      ),
    )
  },
})
