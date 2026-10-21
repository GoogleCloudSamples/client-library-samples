# Terraform Validation Fixtures (`.maintenance/fixtures/`)

This directory contains hermetic Terraform configurations used to provision ephemeral prerequisite Google Cloud resources when validating code samples in this repository.

## 1:1 Fixture-to-Sample Contract

Every code sample in this repository separates the **documentation snippet** from its **validation inputs**:

1. **Documentation Snippet (`[START ...]` to `[END ...]`):**
   - Contains a self-contained function or method that accepts explicit parameters (such as `projectId`, `datasetId`, `collectionId`, or `bucketName`) and never reads environment variables or CLI flags directly.
   - Only lines inside the `[START ...]` and `[END ...]` region tags are rendered in Google Cloud documentation.

2. **Terraform Fixture (`.maintenance/fixtures/<fixture_ref>/main.tf`):**
   - Provisions any prerequisite cloud resources required by a sample (for example, a dataset, table, topic, or service account) and declares `snake_case` Terraform outputs:
     ```hcl
     output "dataset_id" {
       description = "The ID of the provisioned BigQuery dataset."
       value       = google_bigquery_dataset.default.dataset_id
     }
     ```
   - Each sample's `.samples/<sample_id>.spec.json` manifest links the sample to its fixture and maps fixture outputs to sample parameters via `extended.fixtures` and `extended.parameters`.

3. **Language Entrypoints:**
   - **Java & Kotlin (In-File `main` Entrypoint Outside Region Tags):**
     - Because Java and Kotlin require a compiled entrypoint (`public static void main` / `fun main`), the entrypoint is placed at the bottom of the sample file **below** the `// [END ...]` region tag.
     - During automated validation (or local testing after `terraform apply`), the validation harness exports `GOOGLE_CLOUD_PROJECT` along with each Terraform `output "<snake_case_name>"` converted to an `UPPER_SNAKE_CASE` environment variable (for example, `output "dataset_id"` -> `DATASET_ID`).
     - The Java/Kotlin `main` entrypoint reads positional CLI arguments or those `UPPER_SNAKE_CASE` environment variables via `System.getenv(...)` (with safe `example-*` placeholder fallbacks) and invokes the sample method. Every Terraform output declared by the fixture maps 1:1 to an environment variable read by `main`.
   - **Python & Node.js:**
     - Sample files publish only the `[START ...]` / `[END ...]` snippet function without an in-file CLI entrypoint; the validation harness binds the Terraform fixture outputs directly to the sample function parameters using the `output_mapping` in `.samples/<sample_id>.spec.json`.
