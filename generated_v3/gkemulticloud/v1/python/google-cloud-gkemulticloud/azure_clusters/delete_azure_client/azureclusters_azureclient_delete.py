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

# [START gkemulticloud_v1_azureclusters_azureclient_delete]
from google.api_core import exceptions
from google.api_core.client_options import ClientOptions
from google.cloud import gke_multicloud_v1


def delete_azure_client(project_id: str, region_id: str, client_id: str) -> None:
    """Deletes an Azure client.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        region_id: The Google Cloud region where the service is located (for example, 'us-central1').
        client_id: ID of the Azure client (for example, 'example-client-id').
    """
    # GKE Multi-Cloud requires a regional endpoint.
    client_options = ClientOptions(
        api_endpoint=f"{region_id}-gkemulticloud.googleapis.com"
    )
    client = gke_multicloud_v1.AzureClustersClient(client_options=client_options)

    name = f"projects/{project_id}/locations/{region_id}/azureClients/{client_id}"

    request = gke_multicloud_v1.DeleteAzureClientRequest(
        name=name,
    )

    try:
        operation = client.delete_azure_client(request=request)
        print("Waiting for operation to complete...")
        operation.result()
        print(f"Deleted Azure client: {name}")
    except exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END gkemulticloud_v1_azureclusters_azureclient_delete]
