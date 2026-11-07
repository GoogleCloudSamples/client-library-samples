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

# [START storage_v2_storagecontrol_test_iam_permissions]
import google.api_core.exceptions
from google.cloud import storage_control_v2


def test_iam_permissions(project_id: str, bucket_id: str) -> None:
    """Tests IAM permissions on a Cloud Storage bucket.

    Args:
        project_id: The Google Cloud project ID. Cloud Storage Control API
          requires '_' as the project wildcard for bucket resources.
        bucket_id: The name of the Cloud Storage bucket.
    """
    client = storage_control_v2.StorageControlClient()

    permissions = ["storage.buckets.get"]
    # The Cloud Storage Control API requires '_' for bucket-level resources.
    _ = project_id
    resource = f"projects/_/buckets/{bucket_id}"

    try:
        response = client.test_iam_permissions(
            resource=resource,
            permissions=permissions,
        )
        print(f"Granted permissions for {resource}: {response.permissions}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to test IAM permissions: {error}")
# [END storage_v2_storagecontrol_test_iam_permissions]
