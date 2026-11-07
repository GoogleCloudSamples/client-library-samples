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

# [START storage_v2_storagecontrol_storagelayout_get]
from google.api_core import exceptions
from google.cloud import storage_control_v2


def get_storage_layout(project_id: str, bucket_id: str) -> None:
    """Gets the storage layout of a Cloud Storage bucket.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        bucket_id: The ID of the bucket (for example, 'example-bucket-id').
    """
    client = storage_control_v2.StorageControlClient()

    # Cloud Storage bucket resource names use "_" for globally scoped buckets.
    _ = project_id
    name = f"projects/_/buckets/{bucket_id}/storageLayout"

    request = storage_control_v2.GetStorageLayoutRequest(
        name=name,
    )

    try:
        response = client.get_storage_layout(request=request)
        print(f"Storage layout name: {response.name}")
        print(f"Location: {response.location}")
        print(f"Location type: {response.location_type}")
    except exceptions.GoogleAPICallError as e:
        print(f"Failed to get storage layout: {e}")
# [END storage_v2_storagecontrol_storagelayout_get]
