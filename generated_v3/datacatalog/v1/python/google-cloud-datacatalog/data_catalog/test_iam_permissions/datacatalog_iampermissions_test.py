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

# [START datacatalog_v1_datacatalog_test_iam_permissions]
import google.api_core.exceptions
from google.cloud import datacatalog_v1


def test_iam_permissions(
    project_id: str, location_id: str, tag_template_id: str
) -> None:
    """Tests IAM permissions on a tag template.

    Args:
        project_id: The Google Cloud project ID containing the target tag template.
        location_id: The Google Cloud region or location for the tag template (for
          example, 'us-central1').
        tag_template_id: The identifier of the tag template on which permissions
          are checked.
    """
    client = datacatalog_v1.DataCatalogClient()

    resource = (
        f"projects/{project_id}/locations/{location_id}/tagTemplates/{tag_template_id}"
    )
    permissions = [
        "datacatalog.tagTemplates.get",
        "datacatalog.tagTemplates.getIamPolicy",
    ]

    try:
        response = client.test_iam_permissions(
            request={
                "resource": resource,
                "permissions": permissions,
            }
        )
        print(f"Granted permissions on {resource}:")
        for permission in response.permissions:
            print(f"- {permission}")
    except google.api_core.exceptions.GoogleAPIError as err:
        print(f"Failed to test IAM permissions: {err}")


# [END datacatalog_v1_datacatalog_test_iam_permissions]
