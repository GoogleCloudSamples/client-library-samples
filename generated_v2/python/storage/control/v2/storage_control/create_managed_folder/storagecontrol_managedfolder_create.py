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

# [START storage_v2_storagecontrol_managedfolder_create]
import google.api_core.exceptions
from google.cloud import storage_control_v2


def create_managed_folder(
    managed_folder_id: str, project_id: str, bucket_id: str
) -> None:
    """Creates a managed folder in a Cloud Storage bucket.

    Args:
        managed_folder_id: The caller-chosen ID of the managed folder (for
          example, 'example-managed-folder/'). Delimit paths using single '/'
          characters.
        project_id: The Google Cloud project ID (for example,
          'example-project-id').
        bucket_id: The ID of the parent Cloud Storage bucket (for example,
          'example-bucket-id').
    """
    client = storage_control_v2.StorageControlClient()

    # Cloud Storage requires '_' as the project identifier for
    # global-namespaced buckets.
    _ = project_id
    parent = f"projects/_/buckets/{bucket_id}"
    managed_folder = storage_control_v2.ManagedFolder()

    try:
        response = client.create_managed_folder(
            parent=parent,
            managed_folder=managed_folder,
            managed_folder_id=managed_folder_id,
        )
        print(f"Created managed folder: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create managed folder: {error}")
# [END storage_v2_storagecontrol_managedfolder_create]
