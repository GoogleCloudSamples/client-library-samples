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

# [START storage_v2_storagecontrol_folders_list]
from google.api_core import exceptions
from google.cloud import storage_control_v2


def list_folders(project_id: str, bucket_id: str) -> None:
    """Lists folders in a Cloud Storage bucket with hierarchical namespace enabled.

    Args:
        project_id: The Google Cloud project ID.
        bucket_id: The name of the Google Cloud Storage bucket with hierarchical namespace enabled.
    """
    client = storage_control_v2.StorageControlClient()

    # Cloud Storage uses "_" as the project identifier for global-namespaced buckets.
    parent = f"projects/_/buckets/{bucket_id}"

    request = storage_control_v2.ListFoldersRequest(parent=parent)

    try:
        response = client.list_folders(request=request)
        for folder in response:
            print(f"Found folder: {folder.name}")
    except exceptions.GoogleAPIError as error:
        print(f"Error listing folders: {error}")
# [END storage_v2_storagecontrol_folders_list]
