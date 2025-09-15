# Custard CI

Here's an overview of the main files and directories.

```sh
.github/custard/
  ├─ go/                # Go-specific scripts
  |  └─ lint.sh             # Go lint script
  ├─ node/              # Node-specific scripts and configuration
  |  ├─ setup.sh            # Sets up Node.js tooling
  |  └─ lint.sh             # Python lint script
  ├─ python/            # Python-specific scripts and configuration
  |  ├─ setup.sh            # Sets up Python tooling
  |  └─ lint.sh             # Python lint script
  ├─ docs/              # More in-depth documentation
  ├─ test/              # Tests for GHA workflows
  ├─ config.jsonc       # Main configuration file for Custard
  ├─ map.sh             # Runs a script for each item in a JSON list
  └─ run.sh             # Language-agnostic wrapper to run a script
```

## Development environment setup

To set up your local environment, make sure you have:
* [Install Node](https://cloud.google.com/nodejs/docs/setup)
* [Install Python](https://cloud.google.com/python/docs/setup)
* [Install Go](https://cloud.google.com/go/docs/setup)

Then run the following setup scripts from the repository root directory.

```sh
# You only need to run this once.
bash .github/custard/node/setup.sh
bash .github/custard/python/setup.sh
```

## config.jsonc

The [`config.jsonc`](config.jsonc) is the main configuration file for Custard.
Here's how we define how to detect affected packages.

The `package-file` entry defines which files are used to determine where a package is located.
For example, if there was a diff in `path/to/sample/src/example/file.js`, and there's a `path/to/sample/package.json`, then `path/to/sample` is considered the affected package.

The `ignore` entry is where we define files or directories that shouldn't trigger any runs.
For example, only editing `path/to/sample/README.md` shouldn't trigger lint or tests to run for `path/to/sample`, even if it's a valid package.

For information on CI setup files, see [`docs/ci-setup-file.md`](docs/ci-setup-file.md).`

For guidelines and best practices on testing, see the
[testing guidelines](https://github.com/GoogleCloudPlatform/cloud-samples-tools/blob/main/docs/testing-guidelines.md)

## Language-specific scripts

Each language directory contains all the language-specific scripts and configurations.
There's a `setup.sh` script for each language which sets up the environment and installs any dependencies or tooling needed.
Go already has all the linting tools built-in so there's nothing else to set up or install.

Language-specific scripts **must** follow this calling convention:

```sh
bash .github/custard/<language>/<script-name>.sh [package-directory]
```

Specifically, they:
* **Must** be a `bash` script with `.sh` extension.
* **Must** be located in its respective language directory.
* **Must** run from the repository root directory.
* **Must** take the package directory as the first positional argument.
* **Should** exit with a non-zero status code to signal an error.

These requirements are needed to make them compatible with our language-agnostic scripts.

## Language-agnostic scripts

To keep our tooling simple and consistent, we have language-agnostic wrapper scripts.
That way we can call our scripts on a per-package basis and the appropriate language-specific script will be called automatically.

The target package directory **must** contain a dependency manifest file (`package.json`, `requirements.txt`, `go.mod`, etc.).
This is used to infer the language of that directory.

The [`run.sh`](run.sh) script detects the language and calls the appropriate language-specific script.
This means that every language directory **must** contain that language-specific script, even if it's empty.

```sh
# For example, to call the lint script on a single directory.
# usage: bash .github/custard/run.sh <script-name> [path]
bash .github/custard/run.sh lint .github/custard/test/node/lint-pass
```

The [`map.sh`](map.sh) script runs a script on multiple package directories.
The package directories are passed as positional arguments.
This runs the script on all packages, and keeps track of the ones that succeeded and the ones that failed.
It provides a summary at the end, and will exit with a non-zero exit code if there were any failures.
The script runs sequentially on all directories in order to avoid potential conflicts.

```sh
# For example, to call the lint script on multiple directories.
# usage: bash .github/custard/map.sh <script-name> [paths...]
bash .github/custard/map.sh lint \
  .github/custard/test/node/lint-pass \
  .github/custard/test/python/lint-pass \
  .github/custard/test/go/lint-pass
```

## Adding a new script

Make sure the language-specific scripts follow the calling convention.

* Add a `.github/custard/<language>/<script-name>.sh` script on **all languages**.
* If needed, update the `.github/custard/<language>/setup.sh` scripts to do any new setup needed for the new script.
* Update this README with any relevant new information.
* If needed, add a new `.github/workflows/<new-workflow-name>.yaml` to run in GitHub Actions.
* If needed, add tests on [`.github/workflows/test-workflows.yaml`](../workflows/test-workflows.yaml), the test files should live under `.github/custard/test/<language>/`.

## Supporting a new language

Make sure all language-specific files, scripts, and configurations live in the respective `.github/custard/<language>` directory.
If needed, it's okay to copy files or install things into the repository root directory during the language setup.
Just remember to add them to the `.gitignore` file.

* Create a new `.github/custard/<language>` directory.
* Create all the language specific scripts (e.g. `lint.sh`).
* If needed, create a `setup.sh` script and add it to the development environment setup section in this README.
* Update the [`.github/custard/config.jsonc`](config.jsonc) to include the new language's package file and ignore patterns.
* Update the [`.github/custard/run.sh`](run.sh) script to support the new language.
* Update the [`.gitignore`](/.gitignore) with anything that shouldn't be committed to GitHub.
* Update this README with any relevant new information.
* If needed, update the [`.github/workflows/lint.yaml`](/.github/workflows/lint.yaml) workflow to call the new language's `setup.sh` script.
* Add new tests on [`.github/workflows/test-workflows.yaml`](/.github/workflows/test-workflows.yaml), the test files should live under `.github/custard/test/<language>/`.
