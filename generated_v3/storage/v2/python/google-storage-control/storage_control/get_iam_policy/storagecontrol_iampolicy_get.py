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

# [START storage_v2_storagecontrol_iampolicy_get]
from google.api_core import exceptions
from google.cloud import storage_control_v2


def get_iam_policy(project_id: str, bucket_id: str) -> None:
    """Retrieves the IAM policy for a Cloud Storage bucket.

    Args:
        project_id: The Google Cloud project ID containing the target bucket.
        bucket_id: The caller-chosen name or ID of the Cloud Storage bucket.
    """
    client = storage_control_v2.StorageControlClient()

    # Cloud Storage Control requires "_" as the project identifier in bucket resource paths.
    resource = f"projects/_/buckets/{bucket_id}"

    try:
        response = client.get_iam_policy(request={"resource": resource})
        print(f"Retrieved IAM policy for resource: {resource}")
        for binding in response.bindings:
            print(f"Role: {binding.role}")
            print(f"Members: {list(binding.members)}")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve IAM policy: {error}")
# [END storage_v2_storagecontrol_iampolicy_get]
