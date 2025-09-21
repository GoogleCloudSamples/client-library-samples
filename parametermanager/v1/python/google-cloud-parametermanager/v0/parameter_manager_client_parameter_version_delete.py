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

# [START parametermanager_v1_parametermanager_parameterversion_delete]
from google.api_core import exceptions
from google.cloud import parametermanager_v1


def delete_parameter_version(
    project_id: str,
    location: str,
    parameter_id: str,
    parameter_version_id: str,
) -> None:
    """
    Deletes a specific version of a parameter.

    Args:
        project_id: The ID of the Google Cloud project.
        location: The ID of the location where the parameter resides (e.g., "us-central1").
        parameter_id: The ID of the parameter whose version is to be deleted.
        parameter_version_id: The ID of the parameter version to delete.
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
        request = parametermanager_v1.DeleteParameterVersionRequest(name=name)

        client.delete_parameter_version(request=request)

        print(f"Successfully deleted parameter version: {name}")
    except exceptions.NotFound:
        print(
            f"Parameter version '{name}' not found. It may have already been deleted or never existed."
        )
    except Exception as e:
        print(f"An error occurred while deleting parameter version '{name}': {e}")


# [END parametermanager_v1_parametermanager_parameterversion_delete]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Deletes a specific version of a parameter."
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
        help="The ID of the location where the parameter resides (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--parameter_id",
        type=str,
        required=True,
        help="The ID of the parameter whose version is to be deleted.",
    )
    parser.add_argument(
        "--parameter_version_id",
        type=str,
        required=True,
        help="The ID of the parameter version to delete.",
    )

    args = parser.parse_args()

    delete_parameter_version(
        project_id=args.project_id,
        location=args.location,
        parameter_id=args.parameter_id,
        parameter_version_id=args.parameter_version_id,
    )
