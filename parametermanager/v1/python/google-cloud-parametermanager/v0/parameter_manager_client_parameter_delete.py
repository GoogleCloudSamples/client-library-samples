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

# [START parametermanager_v1_parametermanager_parameter_delete]
from google.api_core import exceptions
from google.cloud import parametermanager_v1


def delete_parameter(
    project_id: str,
    location: str,
    parameter_id: str,
) -> None:
    """
    Deletes a parameter.

    Args:
        project_id: The ID of the Google Cloud project.
        location: The Google Cloud location (e.g., "us-central1").
        parameter_id: The ID of the parameter to delete.
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

    parameter_name = client.parameter_path(project_id, location, parameter_id)

    try:
        client.delete_parameter(name=parameter_name)
        print(f"Successfully deleted parameter: {parameter_name}")
    except exceptions.NotFound:
        print(
            f"Parameter {parameter_name} not found. It may have already been deleted."
        )
        print(
            "Please ensure the parameter exists and the project ID, location, and parameter ID are correct."
        )
    except exceptions.GoogleAPICallError as e:
        print(f"Error deleting parameter {parameter_name}: {e}")


# [END parametermanager_v1_parametermanager_parameter_delete]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Deletes a parameter in Google Cloud Parameter Manager."
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
        help="The Google Cloud location (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--parameter_id",
        type=str,
        required=True,
        help="The ID of the parameter to delete.",
    )

    args = parser.parse_args()

    delete_parameter(args.project_id, args.location, args.parameter_id)
