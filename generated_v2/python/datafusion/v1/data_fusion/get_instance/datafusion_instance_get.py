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

# [START datafusion_v1_datafusion_instance_get]
import google.api_core.exceptions
from google.cloud import data_fusion_v1


def get_instance(project_id: str, location_id: str, instance_id: str) -> None:
    """Retrieves details of a Cloud Data Fusion instance.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the Data Fusion instance resides (for example, 'us-central1').
        instance_id: The ID of the Data Fusion instance to retrieve (for example, 'example-instance').
    """
    client = data_fusion_v1.DataFusionClient()

    name = f"projects/{project_id}/locations/{location_id}/instances/{instance_id}"
    request = data_fusion_v1.GetInstanceRequest(name=name)

    try:
        response = client.get_instance(request=request)
        print(f"Instance name: {response.name}")
        print(f"State: {response.state.name}")
        print(f"Version: {response.version}")
        print(f"Service endpoint: {response.service_endpoint}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END datafusion_v1_datafusion_instance_get]
