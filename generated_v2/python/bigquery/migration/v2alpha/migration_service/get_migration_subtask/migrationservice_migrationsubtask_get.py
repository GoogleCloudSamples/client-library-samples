# Copyright 2026 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# [START bigquerymigration_v2alpha_migrationservice_migrationsubtask_get]
from google.api_core import exceptions
from google.cloud import bigquery_migration_v2


def get_migration_subtask(
    project_id: str, location_id: str, workflow_id: str, subtask_id: str
) -> None:
    """Retrieves a migration subtask resource.

    Args:
        project_id: The Google Cloud project ID hosting the BigQuery migration workflow.
        location_id: The Google Cloud regional location where the migration workflow is provisioned.
        workflow_id: The server-generated identifier of the migration workflow.
        subtask_id: The server-generated identifier of the migration subtask.
    """
    client = bigquery_migration_v2.MigrationServiceClient()

    name = f"projects/{project_id}/locations/{location_id}/workflows/{workflow_id}/subtasks/{subtask_id}"

    request = bigquery_migration_v2.GetMigrationSubtaskRequest(
        name=name,
    )

    try:
        response = client.get_migration_subtask(request=request)
        print(f"Subtask name: {response.name}")
        print(f"Subtask state: {response.state}")
    except exceptions.GoogleAPICallError as error:
        print(f"Request failed: {error}")
# [END bigquerymigration_v2alpha_migrationservice_migrationsubtask_get]
