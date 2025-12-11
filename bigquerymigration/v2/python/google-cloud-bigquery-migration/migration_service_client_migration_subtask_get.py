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


# [START bigquerymigration_v2_migrationservice_migrationsubtask_get]
# [START bigquerymigration_migrationservice_migrationsubtask_get]
from google.api_core.exceptions import NotFound
from google.cloud import bigquery_migration_v2


client = bigquery_migration_v2.MigrationServiceClient()


def get_migration_subtask(
    project_id: str, location: str, workflow_id: str, subtask_id: str
) -> None:
    """Gets a previously created migration subtask.

    Args:
        project_id: The Google Cloud project ID.
        location: The geographic location of the migration workflow, for example, "us".
        workflow_id: The ID of the migration workflow.
        subtask_id: The ID of the migration subtask.
    """

    name = client.migration_subtask_path(project_id, location, workflow_id, subtask_id)

    try:
        subtask = client.get_migration_subtask(name=name)
        print(f"Migration subtask found: {subtask.name}")
        print(f"State: {subtask.state.name}")
        print(f"Type: {subtask.type}")
    except NotFound:
        print(f"Migration subtask not found: {name}")


# [END bigquerymigration_migrationservice_migrationsubtask_get]
# [END bigquerymigration_v2_migrationservice_migrationsubtask_get]
