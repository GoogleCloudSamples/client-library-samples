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

# [START memorystore_v1beta_memorystore_backupcollections_list]
from google.api_core import exceptions
from google.cloud import memorystore_v1beta


def list_backup_collections(project_id: str, location_id: str) -> None:
    """Lists backup collections in a given project and location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
    """
    client = memorystore_v1beta.MemorystoreClient()

    parent = f"projects/{project_id}/locations/{location_id}"

    try:
        request = memorystore_v1beta.ListBackupCollectionsRequest(parent=parent)
        page_result = client.list_backup_collections(request=request)

        count = 0
        for backup_collection in page_result:
            print(f"Backup collection: {backup_collection.name}")
            count += 1

        if count == 0:
            print("No backup collections found.")
    except exceptions.GoogleAPICallError as error:
        print(f"Error listing backup collections: {error}")
# [END memorystore_v1beta_memorystore_backupcollections_list]
