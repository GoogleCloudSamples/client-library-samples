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

# [START workloadmanager_v1_workloadmanager_evaluation_delete]
import google.api_core.exceptions
from google.cloud import workloadmanager_v1

client = workloadmanager_v1.WorkloadManagerClient()


def delete_evaluation(project_id: str, location_id: str, evaluation_id: str) -> None:
    """Deletes an evaluation.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or location.
        evaluation_id: The identifier of the evaluation to delete.
    """
    name = f"projects/{project_id}/locations/{location_id}/evaluations/{evaluation_id}"

    try:
        # DeleteEvaluation initiates a long-running operation
        operation = client.delete_evaluation(name=name)
        operation.result()
        print(f"Deleted evaluation: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to delete evaluation: {error}")
# [END workloadmanager_v1_workloadmanager_evaluation_delete]
