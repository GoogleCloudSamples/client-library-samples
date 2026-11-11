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

# [START servicedirectory_v1beta1_registrationservice_endpoint_get]
import google.api_core.exceptions
from google.cloud import servicedirectory_v1beta1

client = servicedirectory_v1beta1.RegistrationServiceClient()


def get_endpoint(
    project_id: str,
    location_id: str,
    namespace_id: str,
    service_id: str,
    endpoint_id: str,
) -> None:
    """Use the get_endpoint method

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or location ID.
        namespace_id: The Service Directory namespace ID.
        service_id: The Service Directory service ID.
        endpoint_id: The Service Directory endpoint ID to retrieve.
    """
    name = (
        f"projects/{project_id}/locations/{location_id}/namespaces/"
        f"{namespace_id}/services/{service_id}/endpoints/{endpoint_id}"
    )

    request = servicedirectory_v1beta1.GetEndpointRequest(name=name)

    try:
        endpoint = client.get_endpoint(request=request)
        print(f"Retrieved endpoint: {endpoint.name}")
        print(f"IP address: {endpoint.address}")
        print(f"Port: {endpoint.port}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve endpoint: {error}")
# [END servicedirectory_v1beta1_registrationservice_endpoint_get]
