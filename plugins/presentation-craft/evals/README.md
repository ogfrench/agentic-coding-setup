# Presentation-craft evaluations

The four brand-neutral skills have routing and outcome cases. The repository's static checks validate structure and packaging; they do **not** establish that the plugin improves Claude's work.

The cases cover title/evidence alignment, neutral research reporting, purpose-selected visuals, approved-outline fidelity, brand adaptation, visual critique and unrelated-task nonactivation. Synthetic briefs allow reproducible public testing; do not add client prompts, decks, images, names or reports.

## Run real behavioral evaluations

From `plugins/presentation-craft/` in a trusted local checkout with authenticated Claude Code v2.1.269+:

```sh
claude plugin eval . --runs 3 --ablation with-without --no-publish
```

This runs repeated trials with the plugin and without it. Inspect both absolute quality and **WITH minus W/OUT**, not only whether a skill was invoked. The `Skill` tool routing checks are diagnostic and may be excluded from two-arm score deltas; the quality graders are the main comparison.

For a quick local grader rehearsal:

```sh
claude plugin eval . --case action-titles-with-uncertainty --runs 1 --ablation none --no-publish
```

A one-run rehearsal is noisy and is not acceptance. Run the full suite at least three times per case and compare the same model, environment and test brief across plugin versions. Use `--model` to pin the model when comparing releases. Where quality differs subtly, blind-review output artifacts and calibrate the judge rubric rather than interpreting a small numeric delta as settled fact.

## What remains unverified

These are **evaluation definitions**, not results. No live Claude runs, rendered slide comparisons, model-by-model assessment or colleague acceptance measurements are evidenced in this repository until their outputs are recorded. The current prompts that allow only `Skill` do not exercise actual PPTX/HTML file delivery; add a separate execution-capable, sandboxed artifact suite before claiming delivery reliability.

For additional details consult the [official Claude Code plugin evaluation documentation](https://code.claude.com/docs/en/plugin-evals). Keep generated reports under `evals/results/` (gitignored), since model responses may contain sensitive content.
