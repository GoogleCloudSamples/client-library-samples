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

# [START eventarc_v1_eventarc_providers_list]
import google.api_core.exceptions
from google.cloud import eventarc_v1

client = eventarc_v1.EventarcClient()


def list_providers(project_id: str, location_id: str) -> None:
    """List Eventarc providers in a specified location.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location or region (for example, 'global' or 'us-central1').
    """
    parent = f"projects/{project_id}/locations/{location_id}"

    request = eventarc_v1.ListProvidersRequest(
        parent=parent,
    )

    try:
        response = client.list_providers(request=request)
        for provider in response:
            print(f"Provider name: {provider.name}")
            print(f"Display name: {provider.display_name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list providers: {error.message}")
# [END eventarc_v1_eventarc_providers_list]
