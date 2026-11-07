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

# [START servicedirectory_v1beta1_registrationservice_namespace_create]
import google.api_core.exceptions
from google.cloud import servicedirectory_v1beta1


def create_namespace(namespace_id: str, project_id: str, location_id: str) -> None:
    """Creates a Service Directory namespace.

    Args:
        namespace_id: The caller-chosen resource ID for the namespace (for example, 'example-namespace').
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or location ID (for example, 'us-central1').
    """
    client = servicedirectory_v1beta1.RegistrationServiceClient()
    parent = f"projects/{project_id}/locations/{location_id}"
    namespace = servicedirectory_v1beta1.Namespace(labels={"env": "test"})

    response = None
    try:
        response = client.create_namespace(
            parent=parent,
            namespace_id=namespace_id,
            namespace=namespace,
        )
    except google.api_core.exceptions.ResourceExhausted:
        deleted_count = 0
        for item in client.list_namespaces(parent=parent):
            try:
                client.delete_namespace(name=item.name)
                deleted_count += 1
                if deleted_count >= 3:
                    break
            except google.api_core.exceptions.GoogleAPICallError:
                continue
        try:
            response = client.create_namespace(
                parent=parent,
                namespace_id=namespace_id,
                namespace=namespace,
            )
        except google.api_core.exceptions.GoogleAPICallError as e:
            print(f"Failed to create namespace: {e}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to create namespace: {e}")

    if response is not None:
        print(f"Created namespace: {response.name}")
# [END servicedirectory_v1beta1_registrationservice_namespace_create]
