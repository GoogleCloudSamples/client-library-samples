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

# [START gkemulticloud_v1_awsclusters_awsserverconfig_get]
from google.api_core import client_options
from google.api_core import exceptions
from google.cloud import gke_multicloud_v1


def get_aws_server_config(project_id: str, region_id: str) -> None:
    """Retrieves the AWS server configuration for a specific Google Cloud project and location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        region_id: The Google Cloud region where the service is located (for example, 'us-west1').
    """
    options = client_options.ClientOptions(
        api_endpoint=f"{region_id}-gkemulticloud.googleapis.com"
    )
    client = gke_multicloud_v1.AwsClustersClient(client_options=options)

    name = f"projects/{project_id}/locations/{region_id}/awsServerConfig"

    try:
        response = client.get_aws_server_config(name=name)
        print(f"Retrieved server config: {response.name}")
        for version_info in response.valid_versions:
            print(f"Supported Kubernetes version: {version_info.version}")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve AWS server config: {error}")
# [END gkemulticloud_v1_awsclusters_awsserverconfig_get]
