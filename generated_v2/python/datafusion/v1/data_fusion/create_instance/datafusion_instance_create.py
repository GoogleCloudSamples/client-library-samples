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

# [START data_fusion_v1_create_instance]
import google.api_core.exceptions
from google.cloud import data_fusion_v1


def create_instance(project_id: str, location_id: str, instance_id: str) -> None:
    """Creates a Cloud Data Fusion instance.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
        instance_id: ID of the Instance (for example, 'example-instance-id')
    """
    client = data_fusion_v1.DataFusionClient()

    parent = f"projects/{project_id}/locations/{location_id}"

    instance = data_fusion_v1.Instance(
        type_=data_fusion_v1.Instance.Type.BASIC,
    )

    request = data_fusion_v1.CreateInstanceRequest(
        parent=parent,
        instance_id=instance_id,
        instance=instance,
    )

    try:
        operation = client.create_instance(request=request)
        print(f"Waiting for operation {operation.operation.name} to complete...")
        response = operation.result(timeout=240)
        print(f"Created Data Fusion instance: {response.name}")
        print(f"Instance type: {response.type_.name}")
        print(f"Instance state: {response.state.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API request failed with error: {error}")
    except (google.api_core.exceptions.RetryError, TimeoutError) as error:
        print(f"Operation timed out: {error}")


# [END data_fusion_v1_create_instance]
