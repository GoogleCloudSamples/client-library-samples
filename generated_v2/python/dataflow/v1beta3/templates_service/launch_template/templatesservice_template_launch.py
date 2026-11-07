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

# [START dataflow_v1beta3_templatesservice_launch_template]
import google.api_core.exceptions
from google.cloud import dataflow_v1beta3


def launch_template(
    project_id: str, location_id: str, gcs_path: str, job_name: str
) -> None:
    """Launches a Dataflow job using a template stored in Cloud Storage.

    Args:
        project_id: The ID of the Google Cloud project that the job belongs to.
        location_id: The regional endpoint to which to direct the request (for
          example, 'us-central1').
        gcs_path: A Cloud Storage path to the template to use to create the job.
          Must be a valid Cloud Storage URL, beginning with 'gs://'.
        job_name: The caller-specified Dataflow job name. Must match the
          regular expression `[a-z]([-a-z0-9]{0,1022}[a-z0-9])?`.
    """
    client = dataflow_v1beta3.TemplatesServiceClient()

    launch_parameters = dataflow_v1beta3.LaunchTemplateParameters(
        job_name=job_name,
        parameters={
            "inputFile": "gs://dataflow-samples/shakespeare/kinglear.txt",
            "output": f"gs://{project_id}/output",
        },
    )

    request = dataflow_v1beta3.LaunchTemplateRequest(
        project_id=project_id,
        location=location_id,
        gcs_path=gcs_path,
        launch_parameters=launch_parameters,
    )

    try:
        response = client.launch_template(request=request)
        print(f"Launched job ID: {response.job.id}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to launch template: {error}")


# [END dataflow_v1beta3_templatesservice_launch_template]
