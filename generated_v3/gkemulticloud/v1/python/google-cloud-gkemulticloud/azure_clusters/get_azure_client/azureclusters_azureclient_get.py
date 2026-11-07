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

# [START gkemulticloud_v1_azureclusters_azureclient_get]
import google.api_core.exceptions
from google.cloud import gke_multicloud_v1


def get_azure_client(project_id: str, region_id: str, client_id: str) -> None:
    """Retrieves details of an existing Azure client resource.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        region_id: The Google Cloud region where the service is located (for example, 'us-central1').
        client_id: ID of the client (for example, 'example-client-id').
    """
    client = gke_multicloud_v1.AzureClustersClient(
        client_options={"api_endpoint": f"{region_id}-gkemulticloud.googleapis.com"}
    )

    name = f"projects/{project_id}/locations/{region_id}/azureClients/{client_id}"

    request = gke_multicloud_v1.GetAzureClientRequest(
        name=name,
    )

    try:
        response = client.get_azure_client(request=request)
        print(f"Retrieved Azure client: {response.name}")
        print(f"Azure tenant ID: {response.tenant_id}")
        print(f"Azure application ID: {response.application_id}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API request failed: {error}")
# [END gkemulticloud_v1_azureclusters_azureclient_get]
