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

# [START servicedirectory_v1beta1_registrationservice_namespaces_list]
import google.api_core.exceptions
from google.cloud import servicedirectory_v1beta1

client = servicedirectory_v1beta1.RegistrationServiceClient()


def list_namespaces(project_id: str, location_id: str) -> None:
    """Lists Service Directory namespaces in a location.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or location ID (for example, 'us-central1').
    """
    parent = f"projects/{project_id}/locations/{location_id}"

    try:
        request = servicedirectory_v1beta1.ListNamespacesRequest(parent=parent)
        response = client.list_namespaces(request=request)

        for namespace in response:
            print(f"Namespace: {namespace.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list namespaces: {error}")
# [END servicedirectory_v1beta1_registrationservice_namespaces_list]
