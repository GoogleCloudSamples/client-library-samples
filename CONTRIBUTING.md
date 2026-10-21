# How to contribute

We'd love to accept your patches and contributions to this project.

## Before you begin

### Sign our Contributor License Agreement

Contributions to this project must be accompanied by a
[Contributor License Agreement](https://cla.developers.google.com/about) (CLA).
You (or your employer) retain the copyright to your contribution; this simply
gives us permission to use and redistribute your contributions as part of the
project.

If you or your current employer have already signed the Google CLA (even if it
was for a different project), you probably don't need to do it again.

Visit <https://cla.developers.google.com/> to see your current agreements or to
sign a new one.

### Review our community guidelines

This project follows
[Google's Open Source Community Guidelines](https://opensource.google/conduct/).

## Contribution process

### Code reviews

All submissions, including submissions by project members, require review. We
use GitHub pull requests for this purpose. Consult
[GitHub Help](https://help.github.com/articles/about-pull-requests/) for more
information on using pull requests.

### Sample Entrypoints & Fixture Contract (For Authors and Reviewers)

Code samples in this repository follow a **1:1 Fixture-to-Sample Contract** backed by [`.maintenance/fixtures/`](.maintenance/fixtures/README.md) and `.samples/*.spec.json`:

- **Inside `[START ...]` / `[END ...]` region tags (all languages):** The sample function or method accepts explicit parameters (with example values in docstrings/Javadoc/KDoc) and performs the API call without reading environment variables.
- **Outside `// [START ...]` / `// [END ...]` region tags (Java and Kotlin):** Compiled JVM samples include a `main` entrypoint (`public static void main` / `fun main`) below `// [END ...]` that reads positional arguments or `UPPER_SNAKE_CASE` environment variables (`System.getenv(...)`, such as `GOOGLE_CLOUD_PROJECT`, `DATASET_ID`, or `COLLECTION_ID`) populated 1:1 from the Terraform `output` blocks in [`.maintenance/fixtures/`](.maintenance/fixtures/README.md) during automated validation. (Python and Node.js samples omit in-file entrypoints and are invoked via `.samples/*.spec.json` `output_mapping`.)

See [`.maintenance/fixtures/README.md`](.maintenance/fixtures/README.md) for the complete specification.
