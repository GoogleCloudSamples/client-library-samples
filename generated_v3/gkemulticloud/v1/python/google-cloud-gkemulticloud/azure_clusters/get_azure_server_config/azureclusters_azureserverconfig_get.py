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

# [START gkemulticloud_v1_azureclusters_azureserverconfig_get]
from google.api_core.client_options import ClientOptions
import google.api_core.exceptions
from google.cloud import gke_multicloud_v1


def get_azure_server_config(project_id: str, location_id: str) -> None:
    """Retrieves the Azure server configuration for a location.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region (for example, 'us-west1').
    """
    # GKE Multi-Cloud requires a regional endpoint.
    client_options = ClientOptions(
        api_endpoint=f"{location_id}-gkemulticloud.googleapis.com"
    )
    client = gke_multicloud_v1.AzureClustersClient(client_options=client_options)

    name = f"projects/{project_id}/locations/{location_id}/azureServerConfig"
    request = gke_multicloud_v1.GetAzureServerConfigRequest(name=name)

    try:
        response = client.get_azure_server_config(request=request)
        print(f"Azure server config resource name: {response.name}")
        for version in response.valid_versions:
            print(f"Supported Kubernetes version: {version.version}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END gkemulticloud_v1_azureclusters_azureserverconfig_get]
