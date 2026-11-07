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

# [START transcoder_v1_transcoderservice_jobtemplate_get]
from google.api_core import exceptions
from google.cloud.video import transcoder_v1


def get_job_template(
    project_id: str, location_id: str, job_template_id: str
) -> None:
    """Retrieves an existing job template.

    Args:
        project_id: The Google Cloud project ID (for example,
          'example-project-id').
        location_id: The Google Cloud region where the job template resides (for
          example, 'us-central1').
        job_template_id: The caller-configured ID of the job template (for
          example, 'example-job-template').
    """
    client = transcoder_v1.TranscoderServiceClient()
    name = (
        f"projects/{project_id}/locations/{location_id}/jobTemplates/{job_template_id}"
    )

    try:
        response = client.get_job_template(name=name)
        print(f"Job template retrieved: {response.name}")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve job template: {error}")
# [END transcoder_v1_transcoderservice_jobtemplate_get]
