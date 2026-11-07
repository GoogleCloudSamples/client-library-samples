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

# [START servicedirectory_v1beta1_registrationservice_endpoint_delete]
import google.api_core.exceptions
from google.cloud import servicedirectory_v1beta1

client = servicedirectory_v1beta1.RegistrationServiceClient()


def delete_endpoint(project_id: str, location_id: str, namespace_id: str, service_id: str, endpoint_id: str) -> None:
    """Delete an endpoint in Service Directory.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region where the endpoint is located (for example, 'us-central1').
        namespace_id: The caller-chosen ID of the parent namespace.
        service_id: The caller-chosen ID of the parent service.
        endpoint_id: The caller-chosen ID of the endpoint to delete.
    """
    name = f"projects/{project_id}/locations/{location_id}/namespaces/{namespace_id}/services/{service_id}/endpoints/{endpoint_id}"

    request = servicedirectory_v1beta1.DeleteEndpointRequest(name=name)

    try:
        client.delete_endpoint(request=request)
        print(f"Deleted endpoint: {name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to delete endpoint: {e}")
# [END servicedirectory_v1beta1_registrationservice_endpoint_delete]
