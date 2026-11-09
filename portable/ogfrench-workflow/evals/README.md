# Portable plugin behavioral evaluations

These cases test four positive skill-routing tasks, one unrelated negative task and outcome quality. The no-plugin arm is a baseline, not a performance claim. Static repository checks validate fixture structure only; they do not run a model.

From the repo root on an authorized Claude Code host, run:

```sh
claude plugin eval portable/ogfrench-workflow --case setup-boundaries --runs 1 --no-publish --max-cost-usd 5
claude plugin eval portable/ogfrench-workflow --runs 3 --no-publish --max-cost-usd 30
```

Record exact model/CLI version, with/without scores, false activations, tool availability, and total model cost. Keep reports and private prompts out of this public repository. A valid eval fixture is not evidence that the live evaluation passed.

The host pass/fail criteria and required evidence fields are maintained in the [release acceptance record](../../../docs/portable-workflow-acceptance.md). Use a fresh installed plugin and a fresh no-plugin session, and report both arms. A failed or unavailable authenticated run is not a green result.
