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

# [START networksecurity_v1_networksecurity_clienttlspolicies_list]
from google.api_core import exceptions
from google.cloud import network_security_v1


def list_client_tls_policies(project_id: str, location_id: str) -> None:
    """Lists Client TLS Policies in a specific project and location.

    Args:
        project_id: The Google Cloud project ID (for example,
          'example-project-id').
        location_id: The Google Cloud region where the service is located (for
          example, 'us-central1').
    """
    client = network_security_v1.NetworkSecurityClient()

    parent = f"projects/{project_id}/locations/{location_id}"

    request = network_security_v1.ListClientTlsPoliciesRequest(
        parent=parent,
    )

    try:
        page_result = client.list_client_tls_policies(request=request)
        for policy in page_result:
            print(f"Policy Name: {policy.name}")
            print(f"Create Time: {policy.create_time}")
            print(f"Update Time: {policy.update_time}")
    except exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END networksecurity_v1_networksecurity_clienttlspolicies_list]
