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

# [START storage_v2_storagecontrol_folder_create]
from google.api_core import exceptions
from google.cloud import storage_control_v2


def create_folder(folder_id: str, project_id: str, bucket_id: str) -> None:
    """Creates a folder in a hierarchical namespace enabled bucket.

    Args:
        folder_id: The full path or ID of the folder, ending with a forward
          slash '/' (for example, 'example-folder/').
        project_id: The Google Cloud project ID.
        bucket_id: The ID of the hierarchical namespace enabled Cloud Storage
          bucket.
    """
    client = storage_control_v2.StorageControlClient()

    folder = storage_control_v2.Folder()
    # Cloud Storage Control requires '_' as the project identifier for global-namespaced buckets.
    parent = f"projects/_/buckets/{bucket_id}"

    try:
        response = client.create_folder(
            parent=parent,
            folder=folder,
            folder_id=folder_id,
        )
        print(f"Created folder: {response.name}")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to create folder: {error}")
# [END storage_v2_storagecontrol_folder_create]
