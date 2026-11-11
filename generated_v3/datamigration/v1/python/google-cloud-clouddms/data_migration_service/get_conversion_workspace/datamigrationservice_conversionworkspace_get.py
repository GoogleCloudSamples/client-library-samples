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

# [START datamigration_v1_datamigrationservice_conversionworkspace_get]
from google.api_core import exceptions
from google.cloud import clouddms_v1


def get_conversion_workspace(
    project_id: str, location_id: str, conversion_workspace_id: str
) -> None:
    """Retrieves a conversion workspace resource.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region of the conversion workspace.
        conversion_workspace_id: The identifier of the conversion workspace.
    """
    client = clouddms_v1.DataMigrationServiceClient()

    name = f"projects/{project_id}/locations/{location_id}/conversionWorkspaces/{conversion_workspace_id}"

    request = clouddms_v1.GetConversionWorkspaceRequest(
        name=name,
    )

    try:
        response = client.get_conversion_workspace(request=request)
        print(f"Retrieved conversion workspace: {response.name}")
        print(f"Display name: {response.display_name}")
    except exceptions.GoogleAPICallError as e:
        print(f"Request failed: {e}")
# [END datamigration_v1_datamigrationservice_conversionworkspace_get]
