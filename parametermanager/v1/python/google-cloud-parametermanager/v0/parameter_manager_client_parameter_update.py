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

# [START parametermanager_v1_parametermanager_parameter_update]
from google.api_core import exceptions
from google.cloud import parametermanager_v1
from google.protobuf import field_mask_pb2


def update_parameter(
    project_id: str,
    location: str,
    parameter_id: str,
) -> None:
    """
    Updates an existing Parameter in Google Cloud Parameter Manager.

    Args:
        project_id: The ID of the Google Cloud project.
        location: The Google Cloud region (e.g., "us-central1").
        parameter_id: The ID of the parameter to update.
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

    updated_parameter = parametermanager_v1.Parameter(
        name=parameter_name,
        labels={
            "environment": "production",
            "owner": "dev-team",
            "status": "active",
        },
    )

    update_mask = field_mask_pb2.FieldMask(paths=["labels"])

    request = parametermanager_v1.UpdateParameterRequest(
        parameter=updated_parameter,
        update_mask=update_mask,
    )

    try:
        response = client.update_parameter(request=request)

        print(f"Successfully updated parameter: {response.name}")
        print(f"New labels: {response.labels}")
    except exceptions.NotFound:
        print(f"Error: Parameter '{parameter_name}' not found.")
        print("Please ensure the project ID, location, and parameter ID are correct.")
    except exceptions.GoogleAPICallError as e:
        print(f"An API error occurred: {e.message}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END parametermanager_v1_parametermanager_parameter_update]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Updates an existing Parameter in Parameter Manager."
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
        help="The ID of the parameter to update.",
    )

    args = parser.parse_args()

    update_parameter(args.project_id, args.location, args.parameter_id)
