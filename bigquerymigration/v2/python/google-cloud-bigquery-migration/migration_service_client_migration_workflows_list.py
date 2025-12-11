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


# [START bigquerymigration_v2_migrationservice_migrationworkflows_list]
# [START bigquerymigration_migrationservice_migrationworkflows_list]
from google.api_core import exceptions
from google.cloud import bigquery_migration_v2

client = bigquery_migration_v2.MigrationServiceClient()


def list_migration_workflows(project_id: str, location: str) -> None:
    """Lists migration workflows in a given project and location.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the migration workflows, for example, "us".
    """

    parent = f"projects/{project_id}/locations/{location}"

    try:
        workflow_pager = client.list_migration_workflows(parent=parent)

        print(f"Workflows in parent '{parent}':")
        count = 0
        for workflow in workflow_pager:
            print(f"- {workflow.name}")
            count += 1

        if not count:
            print("No migration workflows found.")

    except exceptions.NotFound:
        print(f"The parent resource '{parent}' was not found.")
        print("Please check that the project ID and location are correct.")


# [END bigquerymigration_migrationservice_migrationworkflows_list]
# [END bigquerymigration_v2_migrationservice_migrationworkflows_list]
