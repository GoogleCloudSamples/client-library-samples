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

# [START servicedirectory_v1beta1_registrationservice_service_create]
import google.api_core.exceptions
from google.cloud import servicedirectory_v1beta1

client = servicedirectory_v1beta1.RegistrationServiceClient()


def create_service(
    service_id: str, project_id: str, location_id: str, namespace_id: str
) -> None:
    """Creates a service in a Service Directory namespace.

    Args:
        service_id: The ID to assign to the service.
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or location of the namespace.
        namespace_id: The ID of the parent Service Directory namespace.
    """
    parent = f"projects/{project_id}/locations/{location_id}/namespaces/{namespace_id}"
    service = servicedirectory_v1beta1.Service(
        metadata={"stage": "production"}
    )

    try:
        response = client.create_service(
            parent=parent,
            service_id=service_id,
            service=service,
        )
        print(f"Created service: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to create service: {e}")
# [END servicedirectory_v1beta1_registrationservice_service_create]
