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

# [START servicedirectory_v1beta1_registrationservice_endpoints_list]
import google.api_core.exceptions
from google.cloud import servicedirectory_v1beta1

client = servicedirectory_v1beta1.RegistrationServiceClient()


def list_endpoints(
    project_id: str, location_id: str, namespace_id: str, service_id: str
) -> None:
    """Lists endpoints within a Service Directory service.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or location ID (for example, 'us-central1').
        namespace_id: The ID of the parent Service Directory namespace.
        service_id: The ID of the parent service whose endpoints to list.
    """
    parent = (
        f"projects/{project_id}/locations/{location_id}"
        f"/namespaces/{namespace_id}/services/{service_id}"
    )

    request = servicedirectory_v1beta1.ListEndpointsRequest(
        parent=parent,
    )

    try:
        response = client.list_endpoints(request=request)
        for endpoint in response:
            print(f"Endpoint name: {endpoint.name}")
            print(f"Address: {endpoint.address}")
            print(f"Port: {endpoint.port}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to list endpoints: {e}")
# [END servicedirectory_v1beta1_registrationservice_endpoints_list]
