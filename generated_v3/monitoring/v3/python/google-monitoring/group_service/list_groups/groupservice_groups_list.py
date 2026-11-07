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

# [START monitoring_v3_groupservice_groups_list]
import google.api_core.exceptions
from google.cloud import monitoring_v3

client = monitoring_v3.GroupServiceClient()


def list_groups(project_id: str) -> None:
    """Lists monitoring groups in a Google Cloud project.

    Args:
        project_id: The Google Cloud project ID whose monitoring groups are to be listed.
    """
    name = f"projects/{project_id}"

    request = monitoring_v3.ListGroupsRequest(
        name=name,
    )

    try:
        page_result = client.list_groups(request=request)
        for group in page_result:
            print(f"Group Name: {group.name}")
            print(f"Display Name: {group.display_name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list groups: {error}")
# [END monitoring_v3_groupservice_groups_list]
