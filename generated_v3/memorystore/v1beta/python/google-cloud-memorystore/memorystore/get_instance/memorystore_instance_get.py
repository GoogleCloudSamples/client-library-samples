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

# [START memorystore_v1beta_memorystore_instance_get]
from google.api_core import exceptions
from google.cloud import memorystore_v1beta


def get_instance(project_id: str, location_id: str, instance_id: str) -> None:
    """Retrieves details of a Memorystore instance.

    Args:
        project_id: Google Cloud project ID (for example, 'example-project-id').
        location_id: Google Cloud region where the instance resides (for
          example, 'us-central1').
        instance_id: Memorystore instance identifier (for example,
          'example-instance-id').
    """
    client = memorystore_v1beta.MemorystoreClient()

    name = f"projects/{project_id}/locations/{location_id}/instances/{instance_id}"

    try:
        response = client.get_instance(name=name)
        print(f"Retrieved instance: {response.name}")
        print(f"State: {response.state}")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve instance: {error}")
# [END memorystore_v1beta_memorystore_instance_get]
