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

# [START datastream_v1alpha1_datastream_connectionprofiles_list]
import os

import google.api_core.exceptions
import google.auth
from google.cloud import datastream_v1alpha1


def list_connection_profiles() -> None:
    """Lists Datastream connection profiles in a specified project and location."""
    client = datastream_v1alpha1.DatastreamClient()

    _, project_id = google.auth.default()
    if not project_id:
        project_id = os.getenv("GOOGLE_CLOUD_PROJECT")

    location = "us-central1"
    parent = f"projects/{project_id}/locations/{location}"

    request = datastream_v1alpha1.ListConnectionProfilesRequest(
        parent=parent,
    )

    try:
        response = client.list_connection_profiles(request=request)
        for connection_profile in response:
            print(f"Name: {connection_profile.name}")
            print(f"Display Name: {connection_profile.display_name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list connection profiles: {error}")
# [END datastream_v1alpha1_datastream_connectionprofiles_list]
