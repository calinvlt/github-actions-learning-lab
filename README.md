# GitHub Actions Learning Lab

This repository is a hands-on path from a first CI workflow to secure, reusable
deployment pipelines. The sample is deliberately small: a dependency-free
Node.js HTTP app with two tests.

## Lesson 1 — Your first CI workflow

### Goal

Run the same test command locally and on a fresh GitHub-hosted machine whenever
code reaches `main`, or a pull request targets `main`.

### 1. Prove the app works locally

```bash
npm ci
npm test
npm start
```

Open <http://localhost:3000>. Stop the server with `Ctrl+C`.

### 2. Read the workflow from the outside in

The workflow lives at [`.github/workflows/ci.yml`](.github/workflows/ci.yml).

| GitHub Actions | Rough Jenkins equivalent | Meaning here |
| --- | --- | --- |
| Workflow | `Jenkinsfile` pipeline | The complete CI definition |
| Event under `on` | webhook/build trigger | Decides when CI starts |
| Runner | agent/node | A fresh Ubuntu machine for the job |
| Job | stage (approximately) | One isolated unit named `test` |
| Step with `uses` | plugin/shared step | Reuses a packaged action |
| Step with `run` | `sh` step | Runs a shell command |

Read it in this order:

1. `on` accepts pushes to `main`, pull requests into `main`, and manual runs.
2. `permissions: contents: read` limits the automatic token to read access.
3. `jobs.test` requests a fresh Ubuntu runner.
4. `actions/checkout` puts this repository on that runner.
5. `actions/setup-node` installs Node.js 22 and enables npm caching.
6. `npm ci` recreates exactly what is recorded in `package-lock.json`.
7. `npm test` runs the same tests you ran locally.

Unlike a typical long-lived Jenkins agent, assume each GitHub-hosted runner is
empty at the beginning and discarded after its job. Anything needed by a later
job must be recreated, cached, or uploaded as an artifact.

### 3. Put the project on GitHub

Create an empty GitHub repository, then run the commands GitHub shows under
“push an existing repository.” The usual sequence is:

```bash
git init
git add .
git commit -m "Add first GitHub Actions workflow"
git branch -M main
git remote add origin YOUR_REPOSITORY_URL
git push -u origin main
```

Then open the repository’s **Actions** tab and select **CI**. Expand each step
to connect the YAML with its log output.

### 4. First experiment: observe a failure

In `test/greeting.test.js`, temporarily change `Hello, Mona!` to an incorrect
expected value. Commit and push it on a branch, then open a pull request. Notice:

- the `pull_request` event starts the workflow;
- the test step exits non-zero;
- the job and workflow become failed checks;
- later steps would not run by default.

Fix the expected value and push again. GitHub adds a new workflow run to the
same pull request; the earlier failed run remains useful evidence.

### Lesson 1 checkpoint

You are ready for Lesson 2 when you can answer:

- Which three events can start this workflow?
- What is the difference between `uses` and `run`?
- Why does the workflow need checkout if GitHub already knows the repository?
- What makes a step fail?

## Course path

We will evolve this same repository one small change at a time:

1. **Foundations:** triggers, runners, jobs, steps, actions, logs, and contexts.
2. **Real CI:** lint/build/test jobs, dependencies with `needs`, conditions,
   concurrency, caching, and test/build artifacts.
3. **Compatibility:** matrix builds across Node versions and operating systems.
4. **Containers:** service containers and running a job in a container.
5. **Trust boundaries:** `GITHUB_TOKEN` permissions, secrets, untrusted pull
   requests, dependency pinning, and supply-chain security.
6. **Deployments:** environments, approvals, protected branches, and releases.
7. **Reuse:** composite actions and reusable workflows with typed inputs.
8. **Cloud delivery:** OIDC, short-lived cloud credentials, deployment gates,
   rollback, and production-safe CI/CD design.

Each lesson will add only the files needed for that concept and include a small
break/fix exercise.
