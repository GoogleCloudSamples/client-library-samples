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

# [START file_v1_cloudfilestoremanager_instance_get]
import google.api_core.exceptions
from google.cloud import filestore_v1


def get_instance(project_id: str, location_id: str, instance_id: str) -> None:
    """Gets details of a Filestore instance.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
        instance_id: ID of the Instance (for example, 'example-instance-id')
    """
    client = filestore_v1.CloudFilestoreManagerClient()

    name = f"projects/{project_id}/locations/{location_id}/instances/{instance_id}"

    request = filestore_v1.GetInstanceRequest(
        name=name,
    )

    try:
        response = client.get_instance(request=request)
        print(f"Retrieved Filestore instance: {response.name}")
        print(f"Instance state: {response.state.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Error retrieving Filestore instance: {e}")


# [END file_v1_cloudfilestoremanager_instance_get]
