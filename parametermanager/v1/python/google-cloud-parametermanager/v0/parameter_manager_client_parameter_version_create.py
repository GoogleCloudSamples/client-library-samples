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

# [START parametermanager_v1_parametermanager_create_parameter_version]
import google.api_core.exceptions
from google.cloud import parametermanager_v1


def create_parameter_version(
    project_id: str, location: str, parameter_id: str, parameter_version_id: str
) -> None:
    """
    Creates a new ParameterVersion in a given project, location, and parameter.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud location (e.g., "global", "us-central1").
        parameter_id: The ID of the parent parameter.
        parameter_version_id: The ID for the new parameter version.
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
    parent_name = client.parameter_path(project_id, location, parameter_id)

    payload = parametermanager_v1.ParameterVersionPayload(
        data=b"my-secret-value-for-version"
    )

    parameter_version = parametermanager_v1.ParameterVersion(payload=payload)

    request = parametermanager_v1.CreateParameterVersionRequest(
        parent=parent_name,
        parameter_version_id=parameter_version_id,
        parameter_version=parameter_version,
    )

    try:
        response = client.create_parameter_version(request=request)
        print(f"Successfully created parameter version: {response.name}")
    except google.api_core.exceptions.AlreadyExists as e:
        print(
            f"Error: A parameter version with ID '{parameter_version_id}' already exists for parameter '{parent_name}'. "
            "Please choose a different ID or consider updating the existing version if applicable."
        )
        print(f"Details: {e}")
    except google.api_core.exceptions.NotFound as e:
        print(
            f"Error: The parent parameter '{parent_name}' was not found. "
            "Please ensure the parameter exists before creating a version."
        )
        print(f"Details: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END parametermanager_v1_parametermanager_create_parameter_version]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Creates a new ParameterVersion in Google Cloud Parameter Manager."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="Your Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        type=str,
        default="global",
        help="The Google Cloud location for the parameter (e.g., 'global', 'us-central1').",
    )
    parser.add_argument(
        "--parameter_id",
        type=str,
        required=True,
        help="The ID of the parent parameter.",
    )
    parser.add_argument(
        "--parameter_version_id",
        type=str,
        required=True,
        help="The ID for the new parameter version.",
    )
    args = parser.parse_args()

    create_parameter_version(
        args.project_id, args.location, args.parameter_id, args.parameter_version_id
    )
