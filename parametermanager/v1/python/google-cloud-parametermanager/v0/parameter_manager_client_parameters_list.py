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

# [START parametermanager_v1_parametermanager_parameters_list]
from google.api_core import exceptions
from google.cloud import parametermanager_v1


def list_parameters(project_id: str, location: str = "global") -> None:
    """Lists parameters in a given Google Cloud project and location.

    Args:
        project_id: The ID of the Google Cloud project.
        location: The Google Cloud location (e.g., "global"). Defaults to "global".
    """

    if location == "global":
        client = parametermanager_v1.ParameterManagerClient()
    else:
        # Create the Parameter Manager client with the regional endpoint.
        client = parametermanager_v1.ParameterManagerClient(
            client_options={
                "api_endpoint": f"parametermanager.{location}.rep.googleapis.com"
            }
        )

    parent = f"projects/{project_id}/locations/{location}"

    try:
        request = parametermanager_v1.ListParametersRequest(parent=parent)

        page_result = client.list_parameters(request=request)

        print(f"Parameters listed for project '{project_id}' in location '{location}':")
        found_parameters = False
        for parameter in page_result:
            found_parameters = True
            print(f"  Parameter Name: {parameter.name}")
            print(f"    Format: {parameter.format.name}")
            print(f"    Create Time: {parameter.create_time.isoformat()}")
            print(f"    Update Time: {parameter.update_time.isoformat()}")

        if not found_parameters:
            print("  No parameters found in this location.")

    except exceptions.NotFound as e:
        print(f"Error: The specified parent resource was not found: {parent}")
        print(
            "Please ensure the project ID and location are correct and the Parameter Manager API is enabled."
        )
    except exceptions.GoogleAPIError as e:
        print(f"An API error occurred: {e}")
        print("Please check the error details and your project configuration.")


# [END parametermanager_v1_parametermanager_parameters_list]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists parameters in a Google Cloud project and location."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="The ID of the Google Cloud project.",
    )
    parser.add_argument(
        "--location",
        type=str,
        default="global",
        help="The Google Cloud location (e.g., 'global').",
    )

    args = parser.parse_args()

    list_parameters(args.project_id, args.location)
