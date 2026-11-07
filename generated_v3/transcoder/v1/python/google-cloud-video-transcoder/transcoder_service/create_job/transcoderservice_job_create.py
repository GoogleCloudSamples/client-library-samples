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

# [START transcoder_v1_transcoderservice_job_create]
import google.api_core.exceptions
from google.cloud.video import transcoder_v1


def create_job(project_id: str, location_id: str) -> None:
    """Creates a transcoding job using a preset template.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region where the transcoding job is processed, such as 'us-central1'.
    """
    client = transcoder_v1.TranscoderServiceClient()

    job = transcoder_v1.Job(
        input_uri="gs://cloud-samples-data/transcoder/sample.mp4",
        output_uri="gs://example-bucket/output/",
        template_id="preset/web-hd",
    )
    parent = f"projects/{project_id}/locations/{location_id}"

    try:
        response = client.create_job(parent=parent, job=job)
        print(f"Created job: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Error creating job: {error}")
# [END transcoder_v1_transcoderservice_job_create]
