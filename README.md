# dLLM Notes

**Diffusion language models, from the objective to production.**

This repository is the source for [dLLM Notes](https://buffett0323.github.io/learning-dllms/), a visual, step-by-step guide to how diffusion language models work and how to serve them. The notes start with the basic idea of generating text by filling in blanks, then build toward training objectives, sampling algorithms, and inference systems. Interactive demos make the mechanics easier to follow, and a reading list keeps annotated copies of the papers behind the notes.

## The roadmap

### Inside the Model

<!-- How a diffusion LLM is built, trained, and sampled. -->

#### Foundations

| # | Note | Hook | Status |
| --- | --- | --- | --- |
| M01 | [Why not left to right?](https://buffett0323.github.io/learning-dllms/posts/why-diffusion/) | Autoregression commits one token at a time. What if we did not? | live |
| M02 | [Diffusion on discrete tokens](https://buffett0323.github.io/learning-dllms/posts/discrete-diffusion/) | There is no Gaussian noise for a vocabulary. | live |
| M03 | [Masked diffusion models](https://buffett0323.github.io/learning-dllms/posts/masked-diffusion/) | One kind of noise: [MASK]. One loss: a weighted cross-entropy. | live |
| M04 | [Where the prompt goes](https://buffett0323.github.io/learning-dllms/posts/prompting/) | Only the answer starts as noise. | live |
| M05 | [Sampling and remasking](https://buffett0323.github.io/learning-dllms/posts/sampling/) | Which blanks do we fill, and when do we change our mind? | live |

#### Scaling up

| # | Note | Hook | Status |
| --- | --- | --- | --- |
| M06 | LLaDA | Does masked diffusion scale like autoregression? | planned |
| M07 | [Starting from an AR checkpoint](https://buffett0323.github.io/learning-dllms/posts/ar-to-diffusion/) | Reuse the AR weights; change the mask and the objective. | live |
| M08 | Block diffusion | Autoregressive across blocks, diffusion within them. | planned |
| M09 | [Mixture-of-Experts dLLMs](https://buffett0323.github.io/learning-dllms/posts/moe-dllm/) | Sparse experts, dense blocks: every token in the block wakes up its own experts. | live |

#### Steering

| # | Note | Hook | Status |
| --- | --- | --- | --- |
| M10 | Constrained decoding | Grammars, when the order is not left to right. | planned |
| M11 | Reinforcement learning for dLLMs | Policy gradients without a tractable likelihood. | planned |

### Into Production

<!-- What it takes to serve a diffusion LLM fast and cheaply. -->

#### Caching mechanisms

| # | Note | Hook | Status |
| --- | --- | --- | --- |
| P01 | [Caching without causality](https://buffett0323.github.io/learning-dllms/posts/kv-cache/) | Bidirectional attention breaks the KV cache. Mostly. | live |
| P02 | [Keeping fewer tokens](https://buffett0323.github.io/learning-dllms/posts/sparse-kv/) | Most keys get almost no attention. Which ones can each head drop? | live |
| P03 | An exact cache again | Make attention causal between blocks, and the KV cache stops being an approximation. | planned |
| P04 | Trimming the masked suffix | Hundreds of trailing masks, and the model barely looks past the first few. | planned |

#### Decoding strategies

| # | Note | Hook | Status |
| --- | --- | --- | --- |
| P05 | [Parallel decoding](https://buffett0323.github.io/learning-dllms/posts/parallel-decoding/) | How many tokens can we commit in one step? | live |
| P06 | Draft, verify, remask | Commit aggressively, then let bidirectional context take the wrong ones back. | planned |
| P07 | Reading the denoising trajectory | The answer often settles long before the last step. Stop there, or let the steps vote. | planned |

#### Serving many requests

| # | Note | Hook | Status |
| --- | --- | --- | --- |
| P08 | [Batching denoising steps](https://buffett0323.github.io/learning-dllms/posts/batching/) | Every request is at a different noise level. Can they share a step? | live |
| P09 | A serving engine for dLLMs | Scheduler, cache manager, sampler: what changes from an AR engine. | planned |

## Paper notes

[The reading list](https://buffett0323.github.io/learning-dllms/papers/) shows each paper's original PDF with highlights and margin notes.

| Paper | Topic | Notes |
| --- | --- | --- |
| [Fast-dLLM](https://buffett0323.github.io/learning-dllms/papers/fast-dllm/) | Block-wise approximate KV cache, confidence-thresholded parallel decoding | on the PDF |
| [dKV-Cache](https://buffett0323.github.io/learning-dllms/papers/dkv-cache/) | Delayed caching of decoded tokens | on the PDF |
| [dLLM-Cache](https://buffett0323.github.io/learning-dllms/papers/dllm-cache/) | Adaptive prompt and response caching | text only (license) |
| [TEAM](https://buffett0323.github.io/learning-dllms/papers/team/) | Expert activation in MoE dLLMs | on the PDF |
| [dLLM-Serve](https://buffett0323.github.io/learning-dllms/papers/dllm-serve/) | Serving: logit memory, Refresh/Reuse scheduling, per-head sparse KV | on the PDF |
| [Fast-dLLM v2](https://buffett0323.github.io/learning-dllms/papers/fast-dllm-v2/) | Block diffusion from Qwen2.5 with ~1B tokens; block and sub-block caches | on the PDF |

<!-- ## Writing

- **A note:** add `src/content/blog/<slug>.mdx`. If `<slug>` matches an entry in `src/series.ts`, the note is numbered and placed on the roadmap; otherwise it is listed under "Other notes". `draft: true` keeps it out of the build.
- **A paper:** put the PDF in `public/pdfs/` and add `src/content/papers/<slug>.mdx`. Pin notes to the PDF with `<Annotation page={5} line={41} text="...">`, or mark text without a note with `<Highlight page={5} line={36} text="..." />` (the text may span lines); open the page with `?lines` in the URL to see line numbers. Omit `pdf` when the license does not allow reposting it; the notes are then shown as text.
- **Demos** are Astro components in `src/components/`, one per figure. -->

## Running locally

```sh
npm install
npm run dev        # http://localhost:4321/learning-dllms/
npm run check      # type-check, build, KaTeX check
```

`npm install` also points git at `.githooks/`, so `npm run check` runs before every commit (skip once with `git commit --no-verify`). It fails on TypeScript errors in `.astro`/`.ts` files, MDX that does not build, formulas KaTeX cannot render, or KaTeX CSS and renderer versions drifting apart.

Built with Astro and KaTeX. Written and drawn by [Buffett Liu](https://github.com/buffett0323).

## Acknowledgements

The site's framework is based on [learning-sglang](https://github.com/WilsonZheng0327/learning-sglang) by Wilson Zheng.
