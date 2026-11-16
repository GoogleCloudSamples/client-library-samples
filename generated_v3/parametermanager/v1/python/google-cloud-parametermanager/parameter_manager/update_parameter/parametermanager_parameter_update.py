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

# [START parametermanager_v1_parametermanager_parameter_update]
import google.api_core.exceptions
from google.cloud import parametermanager_v1
from google.protobuf import field_mask_pb2

client = parametermanager_v1.ParameterManagerClient()


def update_parameter(project_id: str, location_id: str, parameter_id: str) -> None:
    """Updates the labels of a parameter.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location ID (for example, 'global').
        parameter_id: The identifier of the parameter to update.
    """
    parameter = parametermanager_v1.Parameter(
        name=f"projects/{project_id}/locations/{location_id}/parameters/{parameter_id}",
        labels={"status": "updated"},
    )
    update_mask = field_mask_pb2.FieldMask(paths=["labels"])

    try:
        response = client.update_parameter(
            parameter=parameter,
            update_mask=update_mask,
        )
        print(f"Updated parameter: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END parametermanager_v1_parametermanager_parameter_update]
