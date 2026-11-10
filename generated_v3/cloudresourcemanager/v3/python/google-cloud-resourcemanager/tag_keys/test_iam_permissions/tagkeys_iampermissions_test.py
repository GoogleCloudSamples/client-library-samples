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

# [START cloudresourcemanager_v3_tagkeys_test_iam_permissions]
import google.api_core.exceptions
from google.cloud import resourcemanager_v3


def test_iam_permissions(tag_key_id: str) -> None:
    """Tests IAM permissions on a TagKey.

    Args:
        tag_key_id: The server-generated numeric ID of the TagKey.
    """
    client = resourcemanager_v3.TagKeysClient()

    permissions = [
        "resourcemanager.tagKeys.get",
        "resourcemanager.tagKeys.getIamPolicy",
    ]
    resource = f"tagKeys/{tag_key_id}"

    try:
        response = client.test_iam_permissions(
            resource=resource,
            permissions=permissions,
        )
        print(f"Granted permissions: {response.permissions}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Request failed: {error}")
# [END cloudresourcemanager_v3_tagkeys_test_iam_permissions]
