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


# [START bigquerymigration_v2alpha_migrationservice_migrationsubtasks_list]
from google.api_core import exceptions
from google.cloud import bigquery_migration_v2alpha

client = bigquery_migration_v2alpha.MigrationServiceClient()


def list_migration_subtasks(project_id: str, location: str, workflow_id: str) -> None:
    """Lists all migration subtasks for a given workflow.

    This sample demonstrates how to list the subtasks of a BigQuery migration
    workflow. Subtasks represent individual steps or operations within the
    larger migration process.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the migration workflow, for example "us".
        workflow_id: The ID of the migration workflow.
    """

    parent = client.migration_workflow_path(project_id, location, workflow_id)

    try:
        subtasks = client.list_migration_subtasks(parent=parent)

        print(f"Subtasks for workflow '{workflow_id}':")
        for subtask in subtasks:
            print(f"- {subtask.name}")
    except exceptions.NotFound:
        print(f"Migration workflow not found: {parent}")


# [END bigquerymigration_v2alpha_migrationservice_migrationsubtasks_list]
