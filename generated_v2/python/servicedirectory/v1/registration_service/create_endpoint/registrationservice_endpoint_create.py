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

# [START servicedirectory_v1_registrationservice_endpoint_create]
import google.api_core.exceptions
from google.cloud import servicedirectory_v1

client = servicedirectory_v1.RegistrationServiceClient()


def create_endpoint(endpoint_id: str, project_id: str, location_id: str, namespace_id: str, service_id: str) -> None:
    """Use the create_endpoint method

    Args:
        endpoint_id: The Resource ID of the endpoint to create (for example, 'example-endpoint'). Must comply with RFC 1035 (1-63 lowercase alphanumeric characters or hyphens, starting with a lowercase letter and not ending with a hyphen).
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or location ID (for example, 'us-central1').
        namespace_id: The Resource ID of the parent Service Directory namespace (for example, 'example-namespace').
        service_id: The Resource ID of the parent Service Directory service (for example, 'example-service').
    """
    parent = f"projects/{project_id}/locations/{location_id}/namespaces/{namespace_id}/services/{service_id}"
    endpoint = servicedirectory_v1.Endpoint(
        address="10.0.0.1",
        port=443,
    )

    try:
        response = client.create_endpoint(
            parent=parent,
            endpoint_id=endpoint_id,
            endpoint=endpoint,
        )
        print(f"Created endpoint: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to create endpoint: {e}")
# [END servicedirectory_v1_registrationservice_endpoint_create]
