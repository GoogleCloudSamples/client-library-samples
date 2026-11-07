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

# [START servicedirectory_v1beta1_registrationservice_endpoint_create]
import google.api_core.exceptions
from google.cloud import servicedirectory_v1beta1

client = servicedirectory_v1beta1.RegistrationServiceClient()


def create_endpoint(
    endpoint_id: str,
    project_id: str,
    location_id: str,
    namespace_id: str,
    service_id: str,
) -> None:
    """Use the create_endpoint method

    Args:
        endpoint_id: The caller-specified ID of the endpoint to create (e.g.,
          'example-endpoint'). Must be 1-63 characters, starting with a
          lowercase letter and matching `[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?`.
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or location (for example,
          'us-central1').
        namespace_id: The ID of the parent namespace. Must be 1-63 characters
          conforming to RFC 1035.
        service_id: The ID of the parent service. Must be 1-63 characters
          conforming to RFC 1035.
    """
    endpoint = servicedirectory_v1beta1.Endpoint(
        address="10.0.0.1",
        port=443,
    )
    parent = (
        f"projects/{project_id}/locations/{location_id}/"
        f"namespaces/{namespace_id}/services/{service_id}"
    )

    try:
        response = client.create_endpoint(
            parent=parent,
            endpoint_id=endpoint_id,
            endpoint=endpoint,
        )
        print(f"Created endpoint: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create endpoint: {error}")
# [END servicedirectory_v1beta1_registrationservice_endpoint_create]
