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

# [START monitoring_v3_groupservice_group_create]
import google.api_core.exceptions
from google.cloud import monitoring_v3

client = monitoring_v3.GroupServiceClient()


def create_group(project_id: str) -> None:
    """Creates a Cloud Monitoring group.

    Args:
        project_id: The Google Cloud project ID in which to create the group.
    """
    name = f"projects/{project_id}"
    group = monitoring_v3.Group(
        display_name="Sample Group",
        filter='resource.type = "gce_instance"',
    )

    try:
        response = client.create_group(name=name, group=group)
        print(f"Created group: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Error creating group: {error}")
# [END monitoring_v3_groupservice_group_create]
