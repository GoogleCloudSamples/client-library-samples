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

# [START gkemulticloud_v1_azureclusters_azureclients_list]
from google.api_core.client_options import ClientOptions
import google.api_core.exceptions
from google.cloud import gke_multicloud_v1


def list_azure_clients(project_id: str, region_id: str) -> None:
    """Lists Azure clients in a Google Cloud project and location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        region_id: The Google Cloud region where the service is located (for example, 'us-west1').
    """
    # GKE Multi-Cloud requires a regional endpoint.
    client_options = ClientOptions(
        api_endpoint=f"{region_id}-gkemulticloud.googleapis.com"
    )
    client = gke_multicloud_v1.AzureClustersClient(client_options=client_options)

    parent = f"projects/{project_id}/locations/{region_id}"

    request = gke_multicloud_v1.ListAzureClientsRequest(
        parent=parent,
    )

    try:
        response = client.list_azure_clients(request=request)
        for azure_client in response:
            print(f"Azure client name: {azure_client.name}")
            print(f"Azure tenant ID: {azure_client.tenant_id}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Request failed: {error}")
# [END gkemulticloud_v1_azureclusters_azureclients_list]
