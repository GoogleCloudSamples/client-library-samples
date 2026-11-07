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

# [START file_v1_cloudfilestoremanager_instance_delete]
import google.api_core.exceptions
from google.cloud import filestore_v1


def delete_instance(project_id: str, location_id: str, instance_id: str) -> None:
    """Deletes a Filestore instance.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud zone where the Filestore instance resides (for example, 'us-central1-c').
        instance_id: The identifier of the Filestore instance to delete (for example, 'example-filestore-instance').
    """
    client = filestore_v1.CloudFilestoreManagerClient()

    name = f"projects/{project_id}/locations/{location_id}/instances/{instance_id}"

    request = filestore_v1.DeleteInstanceRequest(
        name=name,
    )

    try:
        operation = client.delete_instance(request=request)
        print(f"Waiting for operation {operation.operation.name} to complete...")
        operation.result()
        print(f"Deleted Filestore instance: {name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to delete instance: {e}")
# [END file_v1_cloudfilestoremanager_instance_delete]
