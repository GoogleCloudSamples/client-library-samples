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

# [START workloadmanager_v1_workloadmanager_evaluation_get]
import google.api_core.exceptions
from google.cloud import workloadmanager_v1

client = workloadmanager_v1.WorkloadManagerClient()


def get_evaluation(project_id: str, location_id: str, evaluation_id: str) -> None:
    """Use the get_evaluation method

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location or region of the evaluation.
        evaluation_id: The caller-specified identifier of the Evaluation to retrieve.
    """
    name = f"projects/{project_id}/locations/{location_id}/evaluations/{evaluation_id}"

    request = workloadmanager_v1.GetEvaluationRequest(name=name)

    try:
        response = client.get_evaluation(request=request)
        print(f"Evaluation name: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Request failed: {e}")
# [END workloadmanager_v1_workloadmanager_evaluation_get]
