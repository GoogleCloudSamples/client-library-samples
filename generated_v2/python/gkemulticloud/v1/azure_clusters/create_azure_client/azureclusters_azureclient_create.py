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

# [START gkemulticloud_v1_azureclusters_azureclient_create]
from google.api_core.client_options import ClientOptions
import google.api_core.exceptions
from google.cloud import gke_multicloud_v1


def create_azure_client(
    project_id: str, location_id: str, azure_client_id: str
) -> None:
    """Creates an Azure client resource in Anthos Multi-Cloud.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the AzureClient is created
          (for example, 'us-west1').
        azure_client_id: The client-provided ID for the AzureClient (for example,
          'example-azure-client').
    """
    # GKE Multi-Cloud requires regional API endpoints.
    client_options = ClientOptions(
        api_endpoint=f"{location_id}-gkemulticloud.googleapis.com"
    )
    client = gke_multicloud_v1.AzureClustersClient(client_options=client_options)

    parent = f"projects/{project_id}/locations/{location_id}"
    azure_client = gke_multicloud_v1.AzureClient(
        tenant_id="00000000-0000-0000-0000-000000000000",
        application_id="11111111-1111-1111-1111-111111111111",
    )

    try:
        operation = client.create_azure_client(
            parent=parent,
            azure_client=azure_client,
            azure_client_id=azure_client_id,
        )
        response = operation.result()
        print(f"Created Azure client: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END gkemulticloud_v1_azureclusters_azureclient_create]
