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

# [START datastream_v1alpha1_datastream_connectionprofile_delete]
import google.api_core.exceptions
from google.cloud import datastream_v1alpha1

client = datastream_v1alpha1.DatastreamClient()


def delete_connection_profile(
    project_id: str, location_id: str, connection_profile_id: str
) -> None:
    """Deletes a Datastream connection profile.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region where the connection profile resides.
        connection_profile_id: The identifier of the connection profile to delete.
    """
    name = f"projects/{project_id}/locations/{location_id}/connectionProfiles/{connection_profile_id}"

    request = datastream_v1alpha1.DeleteConnectionProfileRequest(
        name=name,
    )

    try:
        # DeleteConnectionProfile initiates a long-running operation.
        operation = client.delete_connection_profile(request=request)
        print("Waiting for operation to complete...")
        operation.result()
        print(f"Deleted connection profile: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Request failed: {error}")
# [END datastream_v1alpha1_datastream_connectionprofile_delete]
