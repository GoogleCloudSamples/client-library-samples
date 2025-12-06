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

# [START parametermanager_v1_parametermanager_parameter_get]
from google.api_core import exceptions
from google.cloud import parametermanager_v1


def get_parameter(
    project_id: str,
    parameter_id: str,
    location: str = "global",
) -> None:
    """
    Retrieves details of a specific parameter from Google Cloud Parameter Manager.

    Args:
        project_id: The ID of the Google Cloud project.
        location: The Google Cloud region (e.g., "us-central1"). Defaults to "global".
        parameter_id: The ID of the parameter to retrieve.
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

    parameter_name = client.parameter_path(
        project=project_id,
        location=location,
        parameter=parameter_id,
    )

    try:
        parameter = client.get_parameter(name=parameter_name)

        print(f"Successfully retrieved parameter: {parameter.name}")
        print(f"  Create Time: {parameter.create_time.isoformat()}")
        print(f"  Update Time: {parameter.update_time.isoformat()}")
        print(f"  Format: {parameter.format.name}")
        if parameter.labels:
            print(f"  Labels: {parameter.labels}")

    except exceptions.NotFound:
        print(f"Error: Parameter '{parameter_name}' not found.")
        print("Please ensure the project ID, location, and parameter ID are correct.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END parametermanager_v1_parametermanager_parameter_get]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieve details of a Parameter Manager parameter."
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
        help="The Google Cloud region (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--parameter_id",
        type=str,
        required=True,
        help="The ID of the parameter to retrieve.",
    )

    args = parser.parse_args()

    get_parameter(
        project_id=args.project_id,
        location=args.location,
        parameter_id=args.parameter_id,
    )
