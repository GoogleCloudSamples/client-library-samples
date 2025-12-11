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

# [START bigquerymigration_v2alpha_migrationservice_migrationworkflow_delete]
import google.api_core.exceptions
from google.cloud import bigquery_migration_v2alpha

client = bigquery_migration_v2alpha.MigrationServiceClient()


def delete_migration_workflow(project_id: str, location: str, workflow_id: str) -> None:
    """Deletes a migration workflow.

    Args:
        project_id: The Google Cloud project ID.
        location: The geographic location of the migration workflow, for example, "us".
        workflow_id: The ID of the migration workflow to delete.
    """

    name = client.migration_workflow_path(project_id, location, workflow_id)
    request = bigquery_migration_v2alpha.DeleteMigrationWorkflowRequest(
        name=name,
    )

    try:
        client.delete_migration_workflow(request=request)
        print(f"Migration workflow '{workflow_id}' was successfully deleted.")
    except google.api_core.exceptions.NotFound:
        print(f"Migration workflow '{workflow_id}' not found.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END bigquerymigration_v2alpha_migrationservice_migrationworkflow_delete]
