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

# [START datamigration_v1_datamigrationservice_connectionprofile_delete]
from google.api_core import exceptions
from google.cloud import clouddms_v1


def delete_connection_profile(
    project_id: str, location_id: str, connection_profile_id: str
) -> None:
    """Deletes an existing connection profile in Database Migration Service.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region of the connection profile.
        connection_profile_id: The identifier of the connection profile to delete.
    """
    client = clouddms_v1.DataMigrationServiceClient()

    name = f"projects/{project_id}/locations/{location_id}/connectionProfiles/{connection_profile_id}"

    request = clouddms_v1.DeleteConnectionProfileRequest(
        name=name,
    )

    try:
        # DeleteConnectionProfile is a long-running operation
        operation = client.delete_connection_profile(request=request)
        operation.result()

        print(f"Deleted connection profile: {name}")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to delete connection profile: {error}")
# [END datamigration_v1_datamigrationservice_connectionprofile_delete]
