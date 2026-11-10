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

# [START accessapproval_v1_accessapproval_accessapprovalserviceaccount_get]
import google.api_core.exceptions
from google.cloud import accessapproval_v1

client = accessapproval_v1.AccessApprovalClient()


def get_access_approval_service_account(project_id: str) -> None:
    """Retrieve the Access Approval service account for a Google Cloud project.

    Args:
        project_id: The Google Cloud project ID for which to retrieve the Access Approval service account.
    """
    name = f"projects/{project_id}/serviceAccount"

    try:
        response = client.get_access_approval_service_account(name=name)
        print(f"Service account name: {response.name}")
        print(f"Service account email: {response.account_email}")
    except google.api_core.exceptions.GoogleAPIError as exc:
        print(f"Failed to retrieve Access Approval service account: {exc}")
# [END accessapproval_v1_accessapproval_accessapprovalserviceaccount_get]
