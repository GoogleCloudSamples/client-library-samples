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

# [START networkservices_v1_networkservices_servicebinding_create]
import google.api_core.exceptions
from google.cloud import network_services_v1


def create_service_binding(
    project_id: str, location_id: str, service_binding_id: str
) -> None:
    """Creates a ServiceBinding resource.

    Args:
        project_id: The Google Cloud project ID (for example,
            'example-project-id').
        location_id: The Google Cloud location (for example, 'global' or
            'us-central1').
        service_binding_id: The identifier of the ServiceBinding resource to
            create (for example, 'example-service-binding').
    """
    client = network_services_v1.NetworkServicesClient()

    parent = f"projects/{project_id}/locations/{location_id}"
    service_binding = network_services_v1.ServiceBinding(
        description="Sample ServiceBinding",
    )

    try:
        operation = client.create_service_binding(
            parent=parent,
            service_binding_id=service_binding_id,
            service_binding=service_binding,
        )
        response = operation.result()
        print(f"Created ServiceBinding: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create ServiceBinding: {error}")


# [END networkservices_v1_networkservices_servicebinding_create]
