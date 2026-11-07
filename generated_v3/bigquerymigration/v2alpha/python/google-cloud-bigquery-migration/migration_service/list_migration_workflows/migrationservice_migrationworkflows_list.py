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

# [START analyticshub_v2alpha_migrationservice_migrationworkflows_list]
import os

import google.api_core.exceptions
import google.auth
from google.cloud import bigquery_migration_v2


def list_migration_workflows() -> None:
    """Lists migration workflows in a given project and location."""
    client = bigquery_migration_v2.MigrationServiceClient()

    _, default_project_id = google.auth.default()
    project_id = (
        os.environ.get("GOOGLE_CLOUD_PROJECT")
        or os.environ.get("PROJECT_ID")
        or default_project_id
        or "example-project-id"
    )
    location = os.environ.get("LOCATION", "us")
    parent = f"projects/{project_id}/locations/{location}"

    request = bigquery_migration_v2.ListMigrationWorkflowsRequest(
        parent=parent,
    )

    try:
        page_result = client.list_migration_workflows(request=request)
        for response in page_result:
            print(f"Migration workflow name: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to list migration workflows: {e}")


# [END analyticshub_v2alpha_migrationservice_migrationworkflows_list]
