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

# [START lustre_v1_lustre_instances_list]
import google.api_core.exceptions
from google.cloud import lustre_v1


def list_instances(project_id: str, location_id: str) -> None:
    """Lists Managed Service for Lustre instances in a given location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud location (Google Cloud zone, such as 'us-central1-a', or '-' to retrieve instances across all locations).
    """
    client = lustre_v1.LustreClient()
    parent = f"projects/{project_id}/locations/{location_id}"

    request = lustre_v1.ListInstancesRequest(
        parent=parent,
    )

    try:
        response = client.list_instances(request=request)
        found = False
        for instance in response:
            print(f"Instance name: {instance.name}")
            found = True
        if not found:
            print(f"No instances found in {parent}.")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to list instances: {e}")
# [END lustre_v1_lustre_instances_list]
