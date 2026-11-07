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

# [START datamigration_v1_datamigrationservice_rollback_conversion_workspace]
import google.api_core.exceptions
from google.cloud import clouddms_v1


def rollback_conversion_workspace(
    project_id: str, location_id: str, conversion_workspace_id: str
) -> None:
    """Roll back a conversion workspace to the last committed snapshot.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region of the conversion workspace.
        conversion_workspace_id: The ID of the conversion workspace to roll back.
    """
    client = clouddms_v1.DataMigrationServiceClient()

    name = (
        f"projects/{project_id}/locations/{location_id}/"
        f"conversionWorkspaces/{conversion_workspace_id}"
    )

    request = clouddms_v1.RollbackConversionWorkspaceRequest(name=name)

    try:
        operation = client.rollback_conversion_workspace(request=request)
        response = operation.result()
        print(f"Rolled back conversion workspace: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to roll back conversion workspace: {e}")
# [END datamigration_v1_datamigrationservice_rollback_conversion_workspace]
