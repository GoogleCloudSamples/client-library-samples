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

# [START parametermanager_v1_parametermanager_parameterversion_update]
from google.api_core import exceptions
from google.cloud import parametermanager_v1
from google.protobuf import field_mask_pb2


def update_parameter_version(
    project_id: str,
    location: str,
    parameter_id: str,
    parameter_version_id: str,
) -> None:
    """
    Updates a specific parameter version with new payload data.

    Args:
        project_id: The ID of the Google Cloud project.
        location: The Google Cloud region (e.g., "global").
        parameter_id: The ID of the parameter to which the version belongs.
        parameter_version_id: The ID of the parameter version to update.
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

    parameter_version_name = client.parameter_version_path(
        project_id,
        location,
        parameter_id,
        parameter_version_id,
    )

    try:

        # In this example, we update the parameter version to set it as "disabled".
        parameter_version = parametermanager_v1.ParameterVersion(
            name=parameter_version_name, disabled=True
        )

        # Specify that only the 'disabled' field should be updated.
        update_mask = field_mask_pb2.FieldMask(paths=["disabled"])

        # Prepare the request
        request = parametermanager_v1.UpdateParameterVersionRequest(
            parameter_version=parameter_version,
            update_mask=update_mask,
        )

        response = client.update_parameter_version(request=request)

        print(f"Successfully updated parameter version: {response.name}")
        print(f"Current disabled state: {response.disabled}")

    except exceptions.NotFound:
        print(
            f"Error: Parameter version '{parameter_version_name}' not found. "
            "Please ensure the project ID, location, parameter ID, and version ID are correct."
        )
    except exceptions.FailedPrecondition as e:
        print(
            f"Error updating parameter version '{parameter_version_name}': {e}. "
            "This might happen if the parameter version is disabled or in an invalid state."
        )
    except exceptions.GoogleAPICallError as e:
        print(f"An API error occurred: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END parametermanager_v1_parametermanager_parameterversion_update]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Updates a Google Cloud Parameter Manager parameter version."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="The ID of your Google Cloud project.",
    )
    parser.add_argument(
        "--location",
        type=str,
        default="global",
        help="The Google Cloud region (e.g., 'global').",
    )
    parser.add_argument(
        "--parameter_id",
        type=str,
        required=True,
        help="The ID of the parameter to which the version belongs.",
    )
    parser.add_argument(
        "--parameter_version_id",
        type=str,
        required=True,
        help="The ID of the parameter version to update.",
    )

    args = parser.parse_args()

    update_parameter_version(
        project_id=args.project_id,
        location=args.location,
        parameter_id=args.parameter_id,
        parameter_version_id=args.parameter_version_id,
        new_payload_data=args.new_payload_data.encode("utf-8"),
    )
