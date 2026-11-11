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

# [START transcoder_v1_transcoderservice_jobtemplate_delete]
import google.api_core.exceptions
from google.cloud.video import transcoder_v1


def delete_job_template(
    project_id: str, location_id: str, job_template_id: str
) -> None:
    """Deletes a job template.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for
          example, 'us-central1').
        job_template_id: The ID of the job template (for example,
          'example-job-template-id').
    """
    client = transcoder_v1.TranscoderServiceClient()
    name = client.job_template_path(project_id, location_id, job_template_id)

    try:
        client.delete_job_template(name=name)
        print(f"Deleted job template: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to delete job template: {error}")
# [END transcoder_v1_transcoderservice_jobtemplate_delete]
