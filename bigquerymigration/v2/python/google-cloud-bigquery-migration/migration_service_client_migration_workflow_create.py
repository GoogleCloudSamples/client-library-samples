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

import argparse

# [START bigquerymigration_v2_migrationservice_migrationworkflow_create]
# [START bigquerymigration_migrationservice_migrationworkflow_create]
from google.api_core import exceptions
from google.cloud import bigquery_migration_v2
from google.cloud.bigquery_migration_v2.types import (
    migration_entities,
    translation_config,
)


def create_migration_workflow(
    project_id: str, location: str, gcs_source_path: str, gcs_target_path: str
) -> None:
    """Creates a Teradata SQL translation workflow

    Creates a migration workflow to batch translate Teradata SQL scripts
    and DDL into BigQuery-compatible SQL. It configures a translation task
    that reads input files from a Google Cloud Storage source bucket and
    writes the converted output to a target bucket.

    Args:
        project_id: The Google Cloud project ID.
        location: The geographic location of the migration workflow (for example, us).
        gcs_source_path: The Cloud Storage path for a directory of files to
            translate in a batch (for example, gs://example-bucket/example-input-folder/).
        gcs_target_path: The Cloud Storage path to write back the corresponding
            input files to (for example, gs://example-bucket/example-output-folder/).
    """
    client = bigquery_migration_v2.MigrationServiceClient()

    parent = f"projects/{project_id}/locations/{location}"

    source_dialect = bigquery_migration_v2.Dialect()
    source_dialect.teradata_dialect = bigquery_migration_v2.TeradataDialect(
        mode=bigquery_migration_v2.TeradataDialect.Mode.SQL
    )
    target_dialect = bigquery_migration_v2.Dialect()
    target_dialect.bigquery_dialect = bigquery_migration_v2.BigQueryDialect()

    translation_config_details = bigquery_migration_v2.TranslationConfigDetails(
        gcs_source_path=gcs_source_path,
        gcs_target_path=gcs_target_path,
        source_dialect=source_dialect,
        target_dialect=target_dialect,
    )

    task = migration_entities.MigrationTask(
        type="Translation_Teradata2BQ",
        translation_config_details=translation_config_details,
    )

    workflow = migration_entities.MigrationWorkflow(
        display_name="Example Teradata to BigQuery Migration Workflow",
        tasks={"translation-task": task},
    )

    try:
        response = client.create_migration_workflow(
            parent=parent,
            migration_workflow=workflow,
        )
        print(f"Created migration workflow: {response.name}")
        print(f"Display name: {response.display_name}")
        print(f"State: {response.state.name}")
    except exceptions.AlreadyExists as e:
        print(f"Migration workflow already exists: {e}")


# [END bigquerymigration_migrationservice_migrationworkflow_create]
# [END bigquerymigration_v2_migrationservice_migrationworkflow_create]
