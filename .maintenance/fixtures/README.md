# Terraform Validation Fixtures (`.maintenance/fixtures/`)

This directory contains hermetic Terraform configurations used to provision ephemeral prerequisite Google Cloud resources when validating code samples in this repository.

## 1:1 Fixture-to-Entrypoint Contract

Every code sample in this repository separates the **documentation snippet** from its **execution entrypoint**:

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
   - Each sample's `.samples/<sample_id>.spec.json` manifest links the sample to its fixture via `extended.fixtures`.

3. **Sample CLI Entrypoint (`main` / `if __name__ == "__main__":`):**
   - Located **outside** the `[START ...]` / `[END ...]` region tags at the bottom of the sample file.
   - During automated validation (or local testing after `terraform apply`), the validation harness exports `GOOGLE_CLOUD_PROJECT` along with each Terraform `output "<snake_case_name>"` converted to an `UPPER_SNAKE_CASE` environment variable (for example, `output "dataset_id"` -> `DATASET_ID`).
   - The sample's entrypoint reads positional CLI arguments or those `UPPER_SNAKE_CASE` environment variables (with safe `example-*` placeholder fallbacks) and invokes the sample function:
     - **Java:** `System.getenv("DATASET_ID")`
     - **Kotlin:** `System.getenv("DATASET_ID")`
     - **Python:** `os.environ.get("DATASET_ID")`
     - **Node.js:** `process.env.DATASET_ID`
   - Every Terraform output declared by a fixture must map 1:1 to an environment variable read by the sample entrypoint.
