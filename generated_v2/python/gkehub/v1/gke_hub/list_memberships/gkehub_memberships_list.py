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

# [START gkehub_v1_gkehub_memberships_list]
import google.api_core.exceptions
from google.cloud import gkehub_v1

client = gkehub_v1.GkeHubClient()


def list_memberships(project_id: str) -> None:
    """List GKE Hub memberships in a project.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
    """
    parent = f"projects/{project_id}/locations/global"

    request = gkehub_v1.ListMembershipsRequest(parent=parent)

    try:
        response = client.list_memberships(request=request)
        for membership in response:
            print(f"Membership: {membership.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END gkehub_v1_gkehub_memberships_list]
