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

# [START parametermanager_v1_parametermanager_parameter_create]
from google.api_core import exceptions
from google.cloud import parametermanager_v1


def create_parameter(
    project_id: str,
    location: str,
    parameter_id: str,
    parameter_format: parametermanager_v1.ParameterFormat = parametermanager_v1.ParameterFormat.UNFORMATTED,
) -> None:
    """
    Creates a new Parameter in a given project and location.

    Args:
        project_id: The ID of the Google Cloud project.
        location: The Google Cloud location (e.g., "global").
        parameter_id: The ID to assign to the new parameter. Must be unique within the location.
        parameter_format: The format of the parameter (e.g., UNFORMATTED, YAML, JSON).
                          Defaults to UNFORMATTED.
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

    parameter = parametermanager_v1.Parameter(
        format=parameter_format,
    )

    try:
        response = client.create_parameter(
            parent=parent,
            parameter_id=parameter_id,
            parameter=parameter,
        )
        print(f"Successfully created parameter: {response.name}")
        print(f"Parameter format: {response.format.name}")

    except exceptions.AlreadyExists as e:
        print(f"Parameter '{parameter_id}' already exists in {parent}. Error: {e}")
        print("Consider using an update operation or a different parameter_id.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END parametermanager_v1_parametermanager_parameter_create]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Create a new Parameter in Parameter Manager."
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
    parser.add_argument(
        "--parameter_id",
        type=str,
        required=True,
        help="The ID to assign to the new parameter. Must be unique within the location.",
    )
    parser.add_argument(
        "--parameter_format",
        type=str,
        choices=["UNFORMATTED", "YAML", "JSON"],
        default="UNFORMATTED",
        help="The format of the parameter (e.g., UNFORMATTED, YAML, JSON).",
    )

    args = parser.parse_args()

    parameter_format_enum = getattr(
        parametermanager_v1.ParameterFormat, args.parameter_format
    )

    create_parameter(
        project_id=args.project_id,
        location=args.location,
        parameter_id=args.parameter_id,
        parameter_format=parameter_format_enum,
    )
