## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Writing notes

- Notes and paper annotations are in English, short and plain. Chat replies to the author are in Traditional Chinese.
- Paper notes (`src/content/papers/<slug>.mdx`): answer the author's questions about a paper as `<Annotation>`s pinned to the passage, and add `<Highlight>`s where asked. Check anchors with `?lines`. In two-column PDFs a line number covers both columns, so a highlight cannot run across a line that also holds text from the other column; split it into one highlight per line.
- When a paper introduces a concept that matters beyond that paper, **ask** whether to add it to an existing M/P note or open a new one (suggest where). Do not add it unasked.
- Before adding a PDF, check its license. arXiv's nonexclusive-distrib license does not allow reposting; flag it and offer text-only mode (omit `pdf`).
- Commit only when asked.
