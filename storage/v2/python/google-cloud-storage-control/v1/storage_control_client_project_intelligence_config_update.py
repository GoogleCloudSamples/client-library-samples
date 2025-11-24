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

# [START storage_v2_storagecontrol_projectintelligenceconfig_update]
from google.api_core import exceptions
from google.cloud import storage_control_v2
from google.protobuf import field_mask_pb2


def update_project_intelligence_config(
    project_id: str,
) -> None:
    """
    Updates the Project scoped singleton IntelligenceConfig resource.

    This sample demonstrates how to update the intelligence configuration for a
    given project. For instance, you can disable the Storage Intelligence
    features for a project.

    Args:
        project_id: The ID of the Google Cloud project.
    """
    client = storage_control_v2.StorageControlClient()

    # Construct the full resource name for the project-scoped IntelligenceConfig.
    name = f"projects/{project_id}/locations/global/intelligenceConfig"

    # Create an IntelligenceConfig object with the desired updates.
    # Here, we are setting the edition_config to DISABLED.
    intelligence_config = storage_control_v2.IntelligenceConfig(
        name=name,
        edition_config=storage_control_v2.IntelligenceConfig.EditionConfig.DISABLED,
    )

    # Create an update mask to specify which fields are being updated.
    # In this case, we are only updating the 'edition_config' field.
    update_mask = field_mask_pb2.FieldMask(paths=["edition_config"])

    try:
        # Make the API request to update the project intelligence config.
        response = client.update_project_intelligence_config(
            intelligence_config=intelligence_config,
            update_mask=update_mask,
        )

        print("Successfully updated project intelligence configuration:")
        print(f"Name: {response.name}")
        print(f"Edition Config: {response.edition_config.name}")
        print(f"Update Time: {response.update_time.isoformat()}")

    except exceptions.NotFound:
        print(
            f"Error: IntelligenceConfig for project '{project_id}'  not found."
            "Please ensure the project exists."
        )
    except exceptions.GoogleAPICallError as e:
        print(f"An API error occurred: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END storage_v2_storagecontrol_projectintelligenceconfig_update]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Update the project-scoped Storage Intelligence Config."
    )
    parser.add_argument(
        "--project_id", required=True, help="The ID of the Google Cloud project."
    )
    args = parser.parse_args()

    update_project_intelligence_config(args.project_id)
