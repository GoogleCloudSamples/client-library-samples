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

# [START gkemulticloud_v1_attachedclusters_attachedserverconfig_get]
from google.api_core import exceptions
from google.api_core.client_options import ClientOptions
from google.cloud import gke_multicloud_v1


def get_attached_server_config(project_id: str, region_id: str) -> None:
    """Gets the server config for attached clusters in a given location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        region_id: The Google Cloud region where the service is located (for example, 'us-central1').
    """
    options = ClientOptions(
        api_endpoint=f"{region_id}-gkemulticloud.googleapis.com"
    )
    client = gke_multicloud_v1.AttachedClustersClient(client_options=options)

    name = f"projects/{project_id}/locations/{region_id}/attachedServerConfig"

    request = gke_multicloud_v1.GetAttachedServerConfigRequest(
        name=name,
    )

    try:
        response = client.get_attached_server_config(request=request)
        print(f"Server config resource name: {response.name}")
        for valid_version in response.valid_versions:
            print(f"Valid version: {valid_version.version}")
    except exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END gkemulticloud_v1_attachedclusters_attachedserverconfig_get]
