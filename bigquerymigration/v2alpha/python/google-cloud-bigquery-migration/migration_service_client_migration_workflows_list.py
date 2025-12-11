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

# [START bigquerymigration_v2alpha_migrationservice_migrationworkflows_list]
import google.api_core.exceptions
from google.cloud import bigquery_migration_v2alpha

client = bigquery_migration_v2alpha.MigrationServiceClient()


def list_migration_workflows(project_id: str, location: str) -> None:
    """Lists all migration workflows in a given project and location.

    Args:
        project_id: The Google Cloud project ID.
        location: The geographic location of the migration workflows, for example, "us".
    """

    parent = f"projects/{project_id}/locations/{location}"
    request = bigquery_migration_v2alpha.ListMigrationWorkflowsRequest(
        parent=parent,
    )

    try:
        print(f"Listing workflows for '{parent}':")
        workflow_pager = client.list_migration_workflows(request=request)

        for workflow in workflow_pager:
            print(workflow.name)

    except google.api_core.exceptions.NotFound:
        print(
            f"Parent resource '{parent}' not found. Please verify the project ID and location."
        )
    except google.api_core.exceptions.PermissionDenied:
        print("Permission denied. Check your IAM roles.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

    # [END bigquerymigration_v2alpha_migrationservice_migrationworkflows_list]
