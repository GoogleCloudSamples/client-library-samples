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

# [START eventarc_v1_eventarc_pipeline_delete]
from google.api_core import exceptions as core_exceptions
from google.cloud import eventarc_v1


def delete_pipeline(project_id: str, location: str, pipeline_id: str) -> None:
    """
    Deletes an Eventarc pipeline.

    Args:
        project_id: The Google Cloud project ID.
        location: The region where the pipeline is located (e.g., "us-central1").
        pipeline_id: The ID of the pipeline to delete.
    """
    client = eventarc_v1.EventarcClient()

    pipeline_name = client.pipeline_path(project_id, location, pipeline_id)

    request = eventarc_v1.DeletePipelineRequest(
        name=pipeline_name,
    )

    try:
        operation = client.delete_pipeline(request=request)
        print(
            f"Waiting for pipeline deletion operation to complete for {pipeline_name}..."
        )
        response = operation.result()
        print(f"Pipeline {response.name} deleted successfully.")
    except core_exceptions.NotFound:
        print(
            f"Error: Pipeline {pipeline_name} not found. "
            "Please ensure the pipeline ID and location are correct."
        )
    except core_exceptions.GoogleAPICallError as e:
        print(f"An API error occurred: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END eventarc_v1_eventarc_pipeline_delete]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Deletes an Eventarc pipeline.")
    parser.add_argument(
        "--project_id", required=True, help="The Google Cloud project ID."
    )
    parser.add_argument(
        "--location",
        required=True,
        help="The region where the pipeline is located (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--pipeline_id", required=True, help="The ID of the pipeline to delete."
    )
    args = parser.parse_args()

    delete_pipeline(args.project_id, args.location, args.pipeline_id)
