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


# [START bigquerymigration_v2_migrationservice_migrationworkflow_delete]
# [START bigquerymigration_migrationservice_migrationworkflow_delete]
from google.api_core import exceptions
from google.cloud import bigquery_migration_v2

client = bigquery_migration_v2.MigrationServiceClient()


def delete_migration_workflow(project_id: str, location: str, workflow_id: str) -> None:
    """Deletes a migration workflow.

    The migration workflow is a top-level resource that contains all the
    details about a migration. Deleting it will also delete all its
    sub-resources, such as migration tasks.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the migration workflow, for example, "us".
        workflow_id: The ID of the migration workflow to delete.
    """
    name = client.migration_workflow_path(project_id, location, workflow_id)

    try:
        client.delete_migration_workflow(name=name)
        print(f"Deleted migration workflow: {name}")
    except exceptions.NotFound:
        print(f"Migration workflow not found: {name}")


# [END bigquerymigration_migrationservice_migrationworkflow_delete]
# [END bigquerymigration_v2_migrationservice_migrationworkflow_delete]
