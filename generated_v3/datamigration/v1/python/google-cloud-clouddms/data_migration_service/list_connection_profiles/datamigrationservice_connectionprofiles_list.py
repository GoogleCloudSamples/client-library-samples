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

# [START datamigration_v1_datamigrationservice_connectionprofiles_list]
from google.api_core import exceptions
from google.cloud import clouddms_v1


def list_connection_profiles(project_id: str, location_id: str) -> None:
    """Lists connection profiles in a Google Cloud project and location.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region (for example, 'us-central1').
    """
    client = clouddms_v1.DataMigrationServiceClient()

    parent = f"projects/{project_id}/locations/{location_id}"

    request = clouddms_v1.ListConnectionProfilesRequest(parent=parent)

    try:
        page_result = client.list_connection_profiles(request=request)
        for profile in page_result:
            print(f"Connection Profile: {profile.name}")
            print(f"Display Name: {profile.display_name}")
            print(f"State: {profile.state.name}")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to list connection profiles: {error}")
# [END datamigration_v1_datamigrationservice_connectionprofiles_list]
