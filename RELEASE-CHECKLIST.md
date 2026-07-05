# Release Checklist

Per `docs/release-spec.md` §9. Two phases: everything an agent can verify before anything is pushed, and the handful of steps only a human should do.

## Pre-push (agent-verifiable)

- [ ] All Node tests green — `npm test` (matrix: ubuntu/macos/windows × node 18/20/22 in CI, or at least the local platform/version before push)
- [ ] pytest green — `npm run test:python` (matrix: ubuntu/windows × python 3.9/3.12 in CI)
- [ ] `npm pack --dry-run` file list reviewed — no workspace/eval artifacts, no `.pytest_cache/`, no `__pycache__/`, nothing outside the `files` whitelist in `package.json`
- [ ] README quickstart executed verbatim in a clean temp directory (`npm i -g deckforge && deckforge install && deckforge init my-deck`, or the local-tarball equivalent pre-publish)
- [ ] LICENSE holder confirmed — MIT, copyright Ahmed Geindy
- [ ] npm name availability checked — `npm view deckforge` expected to 404 ("not found"); if taken, fall back to package name `deckforge-cli`
- [ ] `repository.url` in `package.json` matches the actual GitHub repo URL
- [ ] `CHANGELOG.md` has a dated `[1.0.0]` entry
- [ ] Secrets scan — no tokens/keys/credentials anywhere in the history being pushed

## Publish (human-only)

- [ ] Create the GitHub repository
- [ ] Push `main`
- [ ] **Create the `npm-publish` GitHub environment with required reviewers** (Settings → Environments → New environment → add yourself as required reviewer) and add the `NPM_TOKEN` secret to that environment. Without this, GitHub auto-creates the environment with NO protection rules and pushing a tag would publish with zero approval.
- [ ] Tag `v1.0.0` and push the tag (triggers `.github/workflows/release.yml`)
- [ ] Approve the `npm-publish` environment gate on the release run (this is the only step that actually publishes to npm)
- [ ] Verify `npx deckforge@latest doctor` works from the published registry package
