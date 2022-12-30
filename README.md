# MinVer for GitHub Actions

_[![Build status](https://github.com/Stelzi79/action-minver/workflows/Build/badge.svg)](https://github.com/Stelzi79/action-minver/actions)_
_[![Test Function of Action](https://github.com/Stelzi79/action-minver/actions/workflows/mainTest.yml/badge.svg)](https://github.com/Stelzi79/action-minver/actions/workflows/mainTest.yml)_

This repository contains a GitHub Action to run [MinVer](https://github.com/adamralph/minver/). This is intended to be used for projects written in languages other than dotnet. See <https://github.com/adamralph/minver/#usage> for more information about MinVer.

## Configuration

```yaml
- uses: Stelzi79/action-minver@main-Stelzi79
  with:
    # Optional. Specifies which part of the version to auto-increment.
    auto-increment: patch
    # Optional. Sets custom build metadata for your semantic version.
    build-metadata: ${{ github.sha }}
    # Optional. Specifies the default pre-release phase.
    default-pre-release-phase: preview
    # Optional. Specifies the minimum version to use when no tags exist.
    minimum-major-minor: 2.0.0
    # Optional. Specifies the prefix of the tags
    tag-prefix: v
    # Optional. Specifies the log level.
    verbosity: trace
    # Optional. Enables you to specifically choose the MinVer version that should be used. Defaults to 4.2.0
    minver-version: 4.2.0
```

## Outputs

- `version`
- `major`
- `minor`
- `patch`
- `prerelease`

## Prerequisites

You must run the following actions first:

- `actions/checkout`: in addition, set `fetch-depth` to 0 to fetch the entire repository, including tags. Without this, the correct version may not get calculated.

## Example

See the Test-Action [mainTest.yml](.github/workflows/mainTest.yml) and [GitHub Action](https://github.com/Stelzi79/action-minver/actions/workflows/mainTest.yml) for reference

```yaml
name: Test Function of Action

on:
  push:
    tags:
      - '*'
    branches:
      - main-Stelzi79

jobs:
  continuous-integration:
    runs-on: ubuntu-latest
    steps:
      - name: checkout
        uses: actions/checkout@master
        with:
          fetch-depth: 0
      - uses: benjlevesque/short-sha@v1.2
        id: short-sha
        with:
          length: 7
      - name: run minver
        id: version
        uses: Stelzi79/action-minver@main-Stelzi79
        with:
          # Optional. Specifies which part of the version to auto-increment.
          auto-increment: patch
          # Optional. Sets custom build metadata for your semantic version.
          # build-metadata: ${{ github.sha }}
          # build-metadata shortened to GitHub default length of 7
          build-metadata: ${{ steps.short-sha.outputs.sha }}
          # Optional. Specifies the default pre-release phase.
          default-pre-release-phase: preview
          # Optional. Specifies the minimum version to use when no tags exist.
          minimum-major-minor: 0.1
          # Optional. Specifies the prefix of the tags
          # tag-prefix: v
          # Optional. Specifies the log level.
          verbosity: info
          # Optional. Enables you to specifically choose the MinVer version that should be used. Defaults to 4.2.0
          minver-version: 4.2.0
      - name: output #version major minor patch prerelease
        run: |
          echo Version: ${{ steps.version.outputs.version }}
          echo major: ${{ steps.version.outputs.major }}, minor: ${{ steps.version.outputs.minor }}, patch: ${{ steps.version.outputs.patch }}
          echo prerelease: ${{ steps.version.outputs.prerelease }}
```

Please pay special attention to the step id; without this you will not be able to refer to outputs in subsequent steps.
