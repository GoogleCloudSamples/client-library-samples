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

# [START servicedirectory_v1beta1_registrationservice_namespace_delete]
import google.api_core.exceptions
from google.cloud import servicedirectory_v1beta1

client = servicedirectory_v1beta1.RegistrationServiceClient()


def delete_namespace(project_id: str, location_id: str, namespace_id: str) -> None:
    """Deletes an existing Service Directory namespace.

    Args:
        project_id: The Google Cloud project ID hosting the namespace.
        location_id: The Google Cloud region where the target namespace was provisioned.
        namespace_id: The ID of the existing Service Directory namespace to delete.
    """
    name = f"projects/{project_id}/locations/{location_id}/namespaces/{namespace_id}"

    try:
        client.delete_namespace(name=name)
        print(f"Deleted namespace: {name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Request failed: {e}")
# [END servicedirectory_v1beta1_registrationservice_namespace_delete]
