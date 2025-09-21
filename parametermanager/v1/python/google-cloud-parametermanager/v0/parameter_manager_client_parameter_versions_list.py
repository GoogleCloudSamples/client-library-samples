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

# [START parametermanager_v1_parametermanager_parameterversions_list]
from google.api_core import exceptions
from google.cloud import parametermanager_v1


def list_parameter_versions(project_id: str, location: str, parameter_id: str) -> None:
    """Lists parameter versions for a given parameter.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud location (e.g., "global").
        parameter_id: The ID of the parameter whose versions are to be listed.
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

    parent = client.parameter_path(project_id, location, parameter_id)

    try:
        request = parametermanager_v1.ListParameterVersionsRequest(
            parent=parent,
        )

        page_result = client.list_parameter_versions(request=request)

        found_versions = False
        for version in page_result:
            found_versions = True
            print(f"  Found parameter version: {version.name}")
            print(f"    Create time: {version.create_time.isoformat()}")
            print(f"    Update time: {version.update_time.isoformat()}")
            print(f"    Disabled: {version.disabled}")

        if not found_versions:
            print(f"No parameter versions found for parameter: {parent}")
        else:
            print(f"Successfully listed parameter versions for {parent}.")

    except exceptions.NotFound:
        print(
            f"Error: The parameter '{parent}' was not found. "
            "Please ensure the project ID, location, and parameter ID are correct "
            "and the parameter exists."
        )
    except exceptions.PermissionDenied:
        print(
            f"Error: Permission denied to list parameter versions for '{parent}'. "
            "Please check your IAM permissions."
        )
    except exceptions.GoogleAPICallError as e:
        print(f"An API error occurred: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END parametermanager_v1_parametermanager_parameterversions_list]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists parameter versions for a given parameter."
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
        default="global",
        help="The Google Cloud location (e.g., 'global').",
    )
    parser.add_argument(
        "--parameter_id",
        type=str,
        required=True,
        help="The ID of the parameter whose versions are to be listed.",
    )
    args = parser.parse_args()

    list_parameter_versions(
        project_id=args.project_id,
        location=args.location,
        parameter_id=args.parameter_id,
    )
