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

# [START workloadmanager_v1_workloadmanager_evaluation_update]
import google.api_core.exceptions
from google.cloud import workloadmanager_v1
from google.protobuf import field_mask_pb2

client = workloadmanager_v1.WorkloadManagerClient()


def update_evaluation(project_id: str, location_id: str, evaluation_id: str) -> None:
    """Updates an evaluation description.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or location.
        evaluation_id: The evaluation identifier.
    """
    evaluation = workloadmanager_v1.Evaluation(
        name=f"projects/{project_id}/locations/{location_id}/evaluations/{evaluation_id}",
        description="Updated evaluation description",
    )
    update_mask = field_mask_pb2.FieldMask(paths=["description"])

    try:
        operation = client.update_evaluation(
            evaluation=evaluation,
            update_mask=update_mask,
        )
        response = operation.result()
        print(f"Updated evaluation: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to update evaluation: {e}")
# [END workloadmanager_v1_workloadmanager_evaluation_update]
