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

# [START servicedirectory_v1_registrationservice_namespaces_list]
import google.api_core.exceptions
from google.cloud import servicedirectory_v1

client = servicedirectory_v1.RegistrationServiceClient()


def list_namespaces(project_id: str, location_id: str) -> None:
    """Lists namespaces in the specified location.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or location (for example, 'us-central1').
    """
    parent = f"projects/{project_id}/locations/{location_id}"

    try:
        response = client.list_namespaces(parent=parent)
        for namespace in response:
            print(f"Namespace: {namespace.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END servicedirectory_v1_registrationservice_namespaces_list]
