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

# [START eventarc_v1_eventarc_pipeline_create]
import google.api_core.exceptions
from google.cloud import eventarc_v1

client = eventarc_v1.EventarcClient()


def create_pipeline(pipeline_id: str, project_id: str, location_id: str) -> None:
    """Use the create_pipeline method

    Args:
        pipeline_id: The identifier to assign to the pipeline (for example, 'example-pipeline').
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location ID (for example, 'us-central1').
    """
    parent = f"projects/{project_id}/locations/{location_id}"

    endpoint = eventarc_v1.Pipeline.Destination.HttpEndpoint(
        uri="https://example.com/events"
    )
    destination = eventarc_v1.Pipeline.Destination(http_endpoint=endpoint)
    pipeline = eventarc_v1.Pipeline(destinations=[destination])

    try:
        operation = client.create_pipeline(
            parent=parent,
            pipeline=pipeline,
            pipeline_id=pipeline_id,
        )
        response = operation.result()
        print(f"Created pipeline: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create pipeline: {error}")
# [END eventarc_v1_eventarc_pipeline_create]
