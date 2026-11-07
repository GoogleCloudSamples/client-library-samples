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

# [START datamigration_v1_datamigrationservice_conversionworkspace_update]
from google.api_core import exceptions
from google.cloud import clouddms_v1
from google.protobuf import field_mask_pb2


def update_conversion_workspace(
    project_id: str, location_id: str, conversion_workspace_id: str
) -> None:
    """Updates the display name of a conversion workspace.

    Args:
        project_id: The Google Cloud project ID hosting the conversion workspace.
        location_id: The Google Cloud region where the conversion workspace is located.
        conversion_workspace_id: The identifier of the conversion workspace to update.
    """
    client = clouddms_v1.DataMigrationServiceClient()

    workspace_name = (
        f"projects/{project_id}/locations/{location_id}/conversionWorkspaces/{conversion_workspace_id}"
    )

    update_mask = field_mask_pb2.FieldMask(paths=["display_name"])
    conversion_workspace = clouddms_v1.ConversionWorkspace(
        name=workspace_name,
        display_name="Updated Workspace Display Name",
    )

    request = clouddms_v1.UpdateConversionWorkspaceRequest(
        update_mask=update_mask,
        conversion_workspace=conversion_workspace,
    )

    try:
        operation = client.update_conversion_workspace(request=request)
        response = operation.result()
        print(f"Updated conversion workspace: {response.name}")
        print(f"Display name: {response.display_name}")
    except exceptions.GoogleAPICallError as e:
        print(f"Request failed: {e}")


# [END datamigration_v1_datamigrationservice_conversionworkspace_update]
