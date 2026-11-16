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

# [START privilegedaccessmanager_v1_privilegedaccessmanager_entitlements_search]
import google.api_core.exceptions
from google.cloud import privilegedaccessmanager_v1


def search_entitlements(project_id: str, location_id: str) -> None:
    """Searches for entitlements that the caller can request grants for.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The location identifier (for example, 'global').
    """
    client = privilegedaccessmanager_v1.PrivilegedAccessManagerClient()

    parent = f"projects/{project_id}/locations/{location_id}"
    caller_access_type = (
        privilegedaccessmanager_v1.SearchEntitlementsRequest.CallerAccessType.GRANT_REQUESTER
    )

    request = privilegedaccessmanager_v1.SearchEntitlementsRequest(
        parent=parent,
        caller_access_type=caller_access_type,
    )

    try:
        page_result = client.search_entitlements(request=request)
        found = False
        for entitlement in page_result:
            print(f"Entitlement name: {entitlement.name}")
            print(f"Eligible users: {entitlement.eligible_users}")
            found = True
        if not found:
            print(f"No entitlements found in {parent}.")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to search entitlements: {e}")
# [END privilegedaccessmanager_v1_privilegedaccessmanager_entitlements_search]
