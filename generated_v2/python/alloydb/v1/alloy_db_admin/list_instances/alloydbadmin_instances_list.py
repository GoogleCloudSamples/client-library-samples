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

# [START alloydb_v1_alloydbadmin_instances_list]
from google.api_core.exceptions import GoogleAPICallError
from google.cloud import alloydb_v1


def list_instances(project_id: str) -> None:
    """Lists AlloyDB instances across all clusters in a location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
    """
    client = alloydb_v1.AlloyDBAdminClient()

    # Use wildcard '-' to list instances across all clusters in the specified location
    parent = f"projects/{project_id}/locations/us-central1/clusters/-"

    request = alloydb_v1.ListInstancesRequest(
        parent=parent,
    )

    try:
        response = client.list_instances(request=request)
        instances = list(response)
        print(f"Retrieved {len(instances)} instances for parent: {parent}")
        for instance in instances:
            print(f"Instance name: {instance.name}")
            print(f"Instance state: {instance.state}")
    except GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END alloydb_v1_alloydbadmin_instances_list]
