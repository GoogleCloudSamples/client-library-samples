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

# [START networkconnectivity_v1alpha1_hubservice_hub_get]
import google.api_core.exceptions
from google.cloud import networkconnectivity_v1alpha1

client = networkconnectivity_v1alpha1.HubServiceClient()


def get_hub(project_id: str, hub_id: str) -> None:
    """Use the get_hub method to retrieve details of an existing Network Connectivity Hub.

    Args:
        project_id: The Google Cloud project ID.
        hub_id: The identifier of the Hub.
    """
    name = f"projects/{project_id}/locations/global/hubs/{hub_id}"

    try:
        response = client.get_hub(name=name)
        print(f"Hub retrieved: {response.name}")
        print(f"Description: {response.description}")
        print(f"State: {response.state}")
    except google.api_core.exceptions.NotFound as exc:
        print(f"Hub not found: {exc.message}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"API call failed: {exc.message}")
# [END networkconnectivity_v1alpha1_hubservice_hub_get]
