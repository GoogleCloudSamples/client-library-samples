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

# [START networkservices_v1_networkservices_tlsroutes_list]
from google.api_core.exceptions import GoogleAPICallError
from google.cloud import network_services_v1


def list_tls_routes(project_id: str, location_id: str) -> None:
    """List TLS routes in a given project and location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
    """
    client = network_services_v1.NetworkServicesClient()

    parent = f"projects/{project_id}/locations/{location_id}"

    request = network_services_v1.ListTlsRoutesRequest(
        parent=parent,
    )

    try:
        page_result = client.list_tls_routes(request=request)
        for response in page_result:
            print(f"Name: {response.name}")
    except GoogleAPICallError as e:
        print(f"Request failed: {e}")
# [END networkservices_v1_networkservices_tlsroutes_list]
