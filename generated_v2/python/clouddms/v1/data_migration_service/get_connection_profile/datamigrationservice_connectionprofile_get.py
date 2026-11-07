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

# [START datamigration_v1_datamigrationservice_connectionprofile_get]
import google.api_core.exceptions
from google.cloud import clouddms_v1


def get_connection_profile(
    project_id: str, location_id: str, connection_profile_id: str
) -> None:
    """Retrieves details of a Database Migration Service connection profile.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region where the connection profile is
          located (for example, 'us-central1').
        connection_profile_id: The identifier of the connection profile to
          retrieve.
    """
    client = clouddms_v1.DataMigrationServiceClient()

    name = (
        f"projects/{project_id}/locations/{location_id}/"
        f"connectionProfiles/{connection_profile_id}"
    )

    request = clouddms_v1.GetConnectionProfileRequest(name=name)

    try:
        response = client.get_connection_profile(request=request)
        print(f"Connection profile retrieved: {response.name}")
        print(f"Display name: {response.display_name}")
        print(f"State: {response.state.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve connection profile: {error}")


# [END datamigration_v1_datamigrationservice_connectionprofile_get]
