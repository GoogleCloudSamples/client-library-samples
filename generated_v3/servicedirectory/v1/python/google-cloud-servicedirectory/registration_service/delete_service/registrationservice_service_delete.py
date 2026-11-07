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

# [START servicedirectory_v1_registrationservice_service_delete]
import google.api_core.exceptions
from google.cloud import servicedirectory_v1

client = servicedirectory_v1.RegistrationServiceClient()


def delete_service(project_id: str, location_id: str, namespace_id: str, service_id: str) -> None:
    """Deletes a Service Directory service.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or location of the namespace (for example, `us-central1`).
        namespace_id: The caller-specified ID of the parent namespace. Must be 1-63 characters, conforming to RFC1035 (`[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?`).
        service_id: The caller-specified ID of the service to delete. Must be 1-63 characters, conforming to RFC1035 (`[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?`).
    """
    name = f"projects/{project_id}/locations/{location_id}/namespaces/{namespace_id}/services/{service_id}"

    try:
        client.delete_service(name=name)
        print(f"Deleted service: {name}")
    except google.api_core.exceptions.GoogleAPIError as exc:
        print(f"Failed to delete service: {exc}")
# [END servicedirectory_v1_registrationservice_service_delete]
