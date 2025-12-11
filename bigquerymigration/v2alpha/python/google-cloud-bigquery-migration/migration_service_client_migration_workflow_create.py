# Copyright 2025 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific languagfor example,verning permissions and
# limitations under the License.

# [START bigquerymigration_v2alpha_migrationservice_migrationworkflow_create]
import google.api_core.exceptions
from google.cloud import bigquery_migration_v2alpha

client = bigquery_migration_v2alpha.MigrationServiceClient()


def create_migration_workflow(
    project_id: str,
    location: str,
    gcs_source_path: str,
    gcs_target_path: str,
) -> None:
    """Creates a Teradata SQL translation workflow

    Creates a migration workflow to batch translate Teradata SQL scripts
    and DDL into BigQuery-compatible SQL. It configures a translation task
    that reads input files from a Google Cloud Storage source bucket and
    writes the converted output to a target bucket.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the migration workflow, for example, "us".
        gcs_source_path: The Cloud Storage path for migration input files.
        gcs_target_path: The Cloud Storage path for migration output files.
    """

    parent = f"projects/{project_id}/locations/{location}"

    task = bigquery_migration_v2alpha.MigrationTask(
        type_="Translation_Teradata2BQ",
        translation_task_details=bigquery_migration_v2alpha.TranslationTaskDetails(
            input_path=gcs_source_path, output_path=gcs_target_path
        ),
    )

    migration_workflow = bigquery_migration_v2alpha.MigrationWorkflow(
        display_name="My Teradata Translation Workflow",
        tasks={"translation-task": task},
    )

    try:
        response = client.create_migration_workflow(
            parent=parent,
            migration_workflow=migration_workflow,
        )

        print(f"Created migration workflow: {response.name}")
        print(f"Display name: {response.display_name}")
        print(f"State: {response.state.name}")
    except google.api_core.exceptions.NotFound:
        print(
            f"Parent resource not found. Please check that the project '{project_id}' and location '{location}' exist."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END bigquerymigration_v2alpha_migrationservice_migrationworkflow_create]
