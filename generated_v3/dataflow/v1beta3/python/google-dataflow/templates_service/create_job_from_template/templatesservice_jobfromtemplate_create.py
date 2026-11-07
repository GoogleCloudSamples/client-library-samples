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

# [START dataflow_v1beta3_templatesservice_jobfromtemplate_create]
import google.api_core.exceptions
from google.cloud import dataflow_v1beta3


def create_job_from_template(
    project_id: str, location_id: str, job_name: str, gcs_path: str
) -> None:
    """Creates a Dataflow job from a Cloud Storage template.

    Args:
        project_id: The ID of the Google Cloud project that owns the Dataflow
          job.
        location_id: The regional endpoint that contains the job (for example,
          'us-central1').
        job_name: The unique name for the created job.
        gcs_path: The Cloud Storage path to the template file, starting with
          'gs://'.
    """
    client = dataflow_v1beta3.TemplatesServiceClient()

    # Supply required template parameters for execution
    parameters = {
        "inputFile": "gs://dataflow-samples/shakespeare/kinglear.txt",
        "output": f"gs://{project_id}/output",
    }

    request = dataflow_v1beta3.CreateJobFromTemplateRequest(
        project_id=project_id,
        location=location_id,
        job_name=job_name,
        gcs_path=gcs_path,
        parameters=parameters,
    )

    try:
        response = client.create_job_from_template(request=request)
        print(f"Created Dataflow job: {response.name}")
        print(f"Job ID: {response.id}")
        print(f"Current state: {response.current_state.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create job from template: {error}")
# [END dataflow_v1beta3_templatesservice_jobfromtemplate_create]
