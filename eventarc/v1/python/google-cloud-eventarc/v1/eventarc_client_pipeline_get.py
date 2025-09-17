# Copyright 2025 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import argparse

# [START eventarc_v1_get_pipeline]
from google.api_core import exceptions
from google.cloud import eventarc_v1


def get_pipeline(
    project_id: str,
    location: str,
    pipeline_id: str,
) -> None:
    """
    Retrieves an Eventarc pipeline by its ID.

    Args:
        project_id: The Google Cloud project ID.
        location: The region or location of the pipeline (e.g., "us-central1").
        pipeline_id: The ID of the pipeline to retrieve.
    """
    client = eventarc_v1.EventarcClient()

    pipeline_name = client.pipeline_path(project_id, location, pipeline_id)

    try:
        request = eventarc_v1.GetPipelineRequest(name=pipeline_name)

        pipeline = client.get_pipeline(request=request)

        print(f"Pipeline: {pipeline.name}")
        print(f"  Display name: {pipeline.display_name}")
        print(f"  Creation time: {pipeline.create_time}")
        if pipeline.destinations:
            print(f"  Destination URI: {pipeline.destinations[0].http_endpoint.uri}")

    except exceptions.NotFound:
        print(f"Error: Pipeline '{pipeline_name}' not found.")
        print("Please ensure the project ID, location, and pipeline ID are correct.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END eventarc_v1_get_pipeline]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieves an Eventarc pipeline by its ID."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        type=str,
        required=True,
        help="The region or location of the pipeline (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--pipeline_id",
        type=str,
        required=True,
        help="The ID of the pipeline to retrieve.",
    )
    args = parser.parse_args()

    get_pipeline(args.project_id, args.location, args.pipeline_id)
