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

# [START workloadmanager_v1_workloadmanager_run_evaluation]
import google.api_core.exceptions
from google.cloud import workloadmanager_v1

client = workloadmanager_v1.WorkloadManagerClient()


def run_evaluation(
    project_id: str, location_id: str, evaluation_id: str, execution_id: str
) -> None:
    """Runs an evaluation for a workload.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        evaluation_id: ID of the existing Evaluation to run (for example, 'example-evaluation-id').
        execution_id: Caller-chosen ID for the new Execution (for example, 'example-execution-id').
    """
    name = f"projects/{project_id}/locations/{location_id}/evaluations/{evaluation_id}"
    execution = workloadmanager_v1.Execution(
        run_type=workloadmanager_v1.Execution.Type.ONE_TIME
    )

    try:
        operation = client.run_evaluation(
            name=name,
            execution=execution,
            execution_id=execution_id,
        )
        response = operation.result()
        print(f"Evaluation execution finished: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Error running evaluation: {error}")
# [END workloadmanager_v1_workloadmanager_run_evaluation]
