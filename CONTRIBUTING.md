# Contributing

- Update Tailwind colors in `tailwind.config.cjs` under `theme.extend.colors`
- CMS schemas live in `public/admin/config.yml`. Add new collections by copying a block and changing `name`, `label`, and `folder`.
- Content lives in `src/data/*` as Markdown files with YAML frontmatter. The CMS writes here.
- Run locally with `npm run dev`. Lint with `npm run lint`. Test with `npm test`.
