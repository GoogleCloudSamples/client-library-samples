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

# [START datamigration_v1_datamigrationservice_connectionprofile_update]
from google.api_core import exceptions
from google.cloud import clouddms_v1
from google.protobuf import field_mask_pb2


def update_connection_profile(
    project_id: str, location_id: str, connection_profile_id: str
) -> None:
    """Updates an existing connection profile in Google Cloud Data Migration Service.

    Args:
        project_id: The Google Cloud project ID where the connection profile resides.
        location_id: The Google Cloud region where the connection profile is located.
        connection_profile_id: The ID of the existing connection profile to update.
    """
    client = clouddms_v1.DataMigrationServiceClient()

    connection_profile = clouddms_v1.ConnectionProfile(
        name=f"projects/{project_id}/locations/{location_id}/connectionProfiles/{connection_profile_id}",
        display_name="Updated Connection Profile",
    )
    update_mask = field_mask_pb2.FieldMask(paths=["display_name"])

    try:
        operation = client.update_connection_profile(
            connection_profile=connection_profile,
            update_mask=update_mask,
        )
        response = operation.result()
        print(f"Updated connection profile: {response.name}")
    except exceptions.GoogleAPICallError as e:
        print(f"Failed to update connection profile: {e}")
# [END datamigration_v1_datamigrationservice_connectionprofile_update]
