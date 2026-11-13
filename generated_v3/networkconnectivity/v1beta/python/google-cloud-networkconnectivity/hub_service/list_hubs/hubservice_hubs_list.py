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

# [START networkconnectivity_v1beta_hubservice_hubs_list]
import google.api_core.exceptions
from google.cloud import networkconnectivity_v1beta

client = networkconnectivity_v1beta.HubServiceClient()


def list_hubs(project_id: str) -> None:
    """Lists Network Connectivity Center hubs in a project.

    Args:
        project_id: Specify the Google Cloud project ID to list hubs from.
    """
    parent = f"projects/{project_id}/locations/global"

    try:
        response = client.list_hubs(parent=parent)
        for hub in response:
            print(f"Hub name: {hub.name}")
            print(f"Hub state: {hub.state}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API request failed: {error}")
# [END networkconnectivity_v1beta_hubservice_hubs_list]
