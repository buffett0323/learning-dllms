// KaTeX checks, run after `astro build` (see `npm run check`):
// 1. rehype-katex renders with the same KaTeX version that ships the CSS (Base.astro imports katex.min.css).
//    A mismatch misplaces sub/superscripts without any error.
// 2. No formula in the built site failed: rehype-katex does not fail the build, it renders a parse error as
//    .katex-error and an unknown command in KaTeX's error color (#cc0000).
import { readdirSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join } from 'node:path';

const require = createRequire(import.meta.url);
const version = (from) => {
	const req = from ? createRequire(require.resolve(from)) : require;
	return JSON.parse(readFileSync(req.resolve('katex/package.json'), 'utf8')).version;
};
let failed = false;

const css = version();
const renderer = version('rehype-katex');
if (css !== renderer) {
	console.error(`✗ KaTeX version mismatch: CSS ${css}, rehype-katex renders with ${renderer}.`);
	failed = true;
}

const html = (dir) =>
	readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
		e.isDirectory() ? html(join(dir, e.name)) : e.name.endsWith('.html') ? [join(dir, e.name)] : [],
	);
for (const file of html('dist')) {
	const page = readFileSync(file, 'utf8');
	const errors = [
		...[...page.matchAll(/<span[^>]*class="katex-error"[^>]*>/g)].map(([tag]) => tag.match(/title="([^"]*)"/)?.[1] ?? 'parse error'),
		...[...page.matchAll(/mathcolor="#cc0000"><mtext>([^<]*)/g)].map(([, cmd]) => `unknown command ${cmd}`),
	];
	for (const e of errors) {
		console.error(`✗ ${file}: ${e.replaceAll('&quot;', '"').replaceAll('&#x27;', "'")}`);
		failed = true;
	}
}

if (failed) process.exit(1);
console.log(`✓ KaTeX ${css}: CSS and renderer match, no formula errors.`);
