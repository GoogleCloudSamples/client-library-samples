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

# [START parametermanager_v1_parametermanager_parameterversion_get]
from google.api_core import exceptions
from google.cloud import parametermanager_v1


def get_parameter_version(
    project_id: str,
    location: str,
    parameter_id: str,
    parameter_version_id: str,
) -> None:
    """
    Retrieves details of a specific parameter version.

    Args:
        project_id: The ID of the Google Cloud project.
        location: The Google Cloud region (e.g., "us-central1").
        parameter_id: The ID of the parameter.
        parameter_version_id: The ID of the parameter version (e.g., "1", "2", or "latest").
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

    name = client.parameter_version_path(
        project=project_id,
        location=location,
        parameter=parameter_id,
        parameter_version=parameter_version_id,
    )

    try:
        parameter_version = client.get_parameter_version(name=name)

        print(f"Successfully retrieved parameter version: {parameter_version.name}")
        print(f"  Create Time: {parameter_version.create_time.isoformat()}")
        print(f"  Update Time: {parameter_version.update_time.isoformat()}")
        print(f"  Disabled: {parameter_version.disabled}")
        if parameter_version.payload and parameter_version.payload.data:
            print(f"  Payload: {parameter_version.payload.data.decode('utf-8')}")
        else:
            print("  Payload: (empty or not available)")

    except exceptions.NotFound:
        print(f"Error: Parameter version '{name}' not found.")
        print(
            "Please ensure the project ID, location, parameter ID, and version ID are correct."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END parametermanager_v1_parametermanager_parameterversion_get]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieve a specific parameter version from Parameter Manager."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="Your Google Cloud Project ID.",
    )
    parser.add_argument(
        "--location",
        type=str,
        default="global",
        help="The Google Cloud region where the parameter is located (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--parameter_id",
        type=str,
        required=True,
        help="The ID of the parameter.",
    )
    parser.add_argument(
        "--parameter_version_id",
        type=str,
        required=True,
        help="The ID of the parameter version.",
    )

    args = parser.parse_args()

    get_parameter_version(
        project_id=args.project_id,
        location=args.location,
        parameter_id=args.parameter_id,
        parameter_version_id=args.parameter_version_id,
    )
