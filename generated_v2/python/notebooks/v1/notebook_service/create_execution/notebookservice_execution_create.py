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

# [START notebooks_v1_notebookservice_execution_create]
from google.api_core.exceptions import GoogleAPICallError
from google.cloud import notebooks_v1


def create_execution(project_id: str, location_id: str, execution_id: str) -> None:
    """Creates a notebook execution job.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        execution_id: ID of the Execution (for example, 'example-execution-id').
    """
    client = notebooks_v1.NotebookServiceClient()

    parent = f"projects/{project_id}/locations/{location_id}"

    execution = notebooks_v1.Execution(
        description="Execution generated via NotebookService",
        execution_template=notebooks_v1.ExecutionTemplate(
            scale_tier=notebooks_v1.ExecutionTemplate.ScaleTier.CUSTOM,
            master_type="n1-standard-4",
            container_image_uri="gcr.io/deeplearning-platform-release/base-cpu",
            input_notebook_file="gs://example-bucket/input.ipynb",
            output_notebook_folder="gs://example-bucket/output",
        ),
    )

    try:
        operation = client.create_execution(
            parent=parent,
            execution_id=execution_id,
            execution=execution,
        )
        response = operation.result()
        print(f"Created execution: {response.name}")
        print(f"Execution state: {response.state.name}")
    except GoogleAPICallError as error:
        print(f"Failed to create execution: {error.message}")
# [END notebooks_v1_notebookservice_execution_create]
