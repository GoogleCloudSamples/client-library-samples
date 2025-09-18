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

# [START eventarc_v1_eventarc_pipelines_list]
from google.api_core import exceptions
from google.cloud import eventarc_v1


def list_pipelines(
    project_id: str,
    location: str,
) -> None:
    """Lists all pipelines in a given project and location.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud region where the pipelines are located (e.g., "us-central1").
    """
    client = eventarc_v1.EventarcClient()
    parent = f"projects/{project_id}/locations/{location}"

    try:
        # Construct the request.
        request = eventarc_v1.ListPipelinesRequest(
            parent=parent,
        )

        page_result = client.list_pipelines(request=request)

        print(f"Pipelines in project {project_id} in location {location}:")
        found_pipelines = False
        for pipeline in page_result:
            found_pipelines = True
            print(f"- {pipeline.name}")

        if not found_pipelines:
            print("No pipelines found.")

    except exceptions.NotFound:
        print(
            f"Error: The project '{project_id}' or location "
            f"'{location}' was not found."
        )
        print(
            "Ensure the project ID and location are correct and "
            "that Eventarc is enabled in this location."
        )
    except exceptions.GoogleAPICallError as e:
        print(f"An API error occurred: {e}")
        print("Please check your project ID, location, and permissions.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END eventarc_v1_eventarc_pipelines_list]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists all Eventarc pipelines in a given project and location."
    )
    parser.add_argument(
        "--project_id",
        help="The Google Cloud project ID.",
        required=True,
    )
    parser.add_argument(
        "--location",
        help="The Google Cloud region (e.g., 'us-central1').",
        default="us-central1",
    )
    args = parser.parse_args()

    list_pipelines(args.project_id, args.location)
