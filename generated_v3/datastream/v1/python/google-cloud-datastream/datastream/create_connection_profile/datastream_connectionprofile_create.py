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

# [START datastream_v1_datastream_connectionprofile_create]
import google.api_core.exceptions
from google.cloud import datastream_v1

client = datastream_v1.DatastreamClient()


def create_connection_profile(
    connection_profile_id: str, project_id: str, location_id: str
) -> None:
    """Creates a Datastream connection profile.

    Args:
        connection_profile_id: The caller-assigned identifier for the connection
          profile.
        project_id: The ID of the Google Cloud project in which to create the
          connection profile.
        location_id: The Google Cloud region for the connection profile, such as
          'us-central1'.
    """
    parent = f"projects/{project_id}/locations/{location_id}"
    connection_profile = datastream_v1.ConnectionProfile(
        display_name="Sample BigQuery Connection Profile",
        bigquery_profile=datastream_v1.BigQueryProfile(),
    )

    try:
        operation = client.create_connection_profile(
            parent=parent,
            connection_profile_id=connection_profile_id,
            connection_profile=connection_profile,
        )
        response = operation.result()
        print(f"Connection profile created successfully: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create connection profile: {error}")


# [END datastream_v1_datastream_connectionprofile_create]
