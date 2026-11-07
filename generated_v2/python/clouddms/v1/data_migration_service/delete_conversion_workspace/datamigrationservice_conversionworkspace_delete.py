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

# [START datamigration_v1_datamigrationservice_conversionworkspace_delete]
import google.api_core.exceptions
from google.cloud import clouddms_v1


def delete_conversion_workspace(
    project_id: str, location_id: str, conversion_workspace_id: str
) -> None:
    """Deletes a conversion workspace.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The target Cloud region where the conversion workspace is
          located.
        conversion_workspace_id: The ID of the conversion workspace to delete.
    """
    client = clouddms_v1.DataMigrationServiceClient()

    name = client.conversion_workspace_path(
        project_id, location_id, conversion_workspace_id
    )

    try:
        operation = client.delete_conversion_workspace(name=name)
        operation.result()
        print(f"Deleted conversion workspace: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to delete conversion workspace: {error}")
# [END datamigration_v1_datamigrationservice_conversionworkspace_delete]
