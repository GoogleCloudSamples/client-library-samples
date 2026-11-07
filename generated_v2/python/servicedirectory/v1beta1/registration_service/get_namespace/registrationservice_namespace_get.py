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

# [START servicedirectory_v1beta1_registrationservice_namespace_get]
import google.api_core.exceptions
from google.cloud import servicedirectory_v1beta1

client = servicedirectory_v1beta1.RegistrationServiceClient()


def get_namespace(project_id: str, location_id: str, namespace_id: str) -> None:
    """Retrieves a Service Directory namespace.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or location ID where the namespace resides (for example, "us-central1").
        namespace_id: The identifier of the Service Directory namespace to retrieve.
    """
    name = f"projects/{project_id}/locations/{location_id}/namespaces/{namespace_id}"

    request = servicedirectory_v1beta1.GetNamespaceRequest(name=name)

    try:
        response = client.get_namespace(request=request)
        print(f"Retrieved namespace: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API error occurred while retrieving namespace: {e}")
# [END servicedirectory_v1beta1_registrationservice_namespace_get]
