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

# [START eventarc_v1_eventarc_pipeline_get]
import google.api_core.exceptions
from google.cloud import eventarc_v1

client = eventarc_v1.EventarcClient()


def get_pipeline(project_id: str, location_id: str, pipeline_id: str) -> None:
    """Retrieves an Eventarc pipeline.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location or region of the pipeline.
        pipeline_id: The caller-chosen identifier of the pipeline.
    """
    name = f"projects/{project_id}/locations/{location_id}/pipelines/{pipeline_id}"

    try:
        response = client.get_pipeline(name=name)
        print(f"Retrieved pipeline: {response.name}")
    except google.api_core.exceptions.NotFound:
        print(f"Pipeline not found: {name}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"API call failed: {exc}")
# [END eventarc_v1_eventarc_pipeline_get]
