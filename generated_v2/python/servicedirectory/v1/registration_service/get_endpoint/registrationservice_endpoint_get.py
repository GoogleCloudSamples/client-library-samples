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

# [START servicedirectory_v1_registrationservice_endpoint_get]
import google.api_core.exceptions
from google.cloud import servicedirectory_v1

client = servicedirectory_v1.RegistrationServiceClient()


def get_endpoint(
    project_id: str,
    location_id: str,
    namespace_id: str,
    service_id: str,
    endpoint_id: str,
) -> None:
    """Retrieves a Service Directory endpoint.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or location of the Service
          Directory resources (for example, 'us-central1').
        namespace_id: The caller-chosen ID of the Service Directory namespace.
        service_id: The caller-chosen ID of the Service Directory service.
        endpoint_id: The caller-chosen ID of the Service Directory endpoint to
          retrieve.
    """
    name = f"projects/{project_id}/locations/{location_id}/namespaces/{namespace_id}/services/{service_id}/endpoints/{endpoint_id}"
    request = servicedirectory_v1.GetEndpointRequest(name=name)

    try:
        response = client.get_endpoint(request=request)
        print(f"Retrieved endpoint: {response.name}")
        print(f"Address: {response.address}")
        print(f"Port: {response.port}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve endpoint: {error}")
# [END servicedirectory_v1_registrationservice_endpoint_get]
