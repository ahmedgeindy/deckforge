# Security Policy

## Design posture

DeckForge makes no network calls and collects no telemetry, by design. The CLI reads and writes only local files (skill sources, agent skill directories, and the deck workspace it scaffolds). There is nothing to intercept in transit and nothing phoned home.

## Supported versions

Security fixes are provided for the latest minor release line only. Please upgrade to the latest `1.x` release before reporting an issue.

## Reporting a vulnerability

Please do not open a public issue for security reports. Report privately using [GitHub Security Advisories](https://github.com/ahmedgeindy/deckforge/security/advisories/new) for this repository.

Include what you found, affected version(s), and steps to reproduce if possible. We'll acknowledge the report and follow up with next steps.
