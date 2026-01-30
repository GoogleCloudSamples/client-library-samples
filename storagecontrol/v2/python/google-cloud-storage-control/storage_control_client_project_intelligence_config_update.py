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

# [START storage_v2_storagecontrol_projectintelligenceconfig_update]
# [START storage_storagecontrol_projectintelligenceconfig_update]
# [START storage_control_projectintelligenceconfig_update]
import google.api_core.exceptions
from google.cloud import storage_control_v2
from google.protobuf import field_mask_pb2


def update_project_intelligence_config(
    project_id: str,
) -> None:
    """
    Updates the Project scoped singleton IntelligenceConfig resource.

    Args:
        project_id: The ID of the Google Cloud project.
    """
    client = storage_control_v2.StorageControlClient()

    name = f"projects/{project_id}/locations/global/intelligenceConfig"

    intelligence_config = storage_control_v2.IntelligenceConfig(
        name=name,
        edition_config=storage_control_v2.IntelligenceConfig.EditionConfig.STANDARD,
    )

    update_mask = field_mask_pb2.FieldMask(paths=["edition_config"])

    try:
        response = client.update_project_intelligence_config(
            intelligence_config=intelligence_config,
            update_mask=update_mask,
        )

        print("Successfully updated project intelligence configuration:")
        print(f"Name: {response.name}")
        print(f"Edition Config: {response.edition_config.name}")
        print(f"Update Time: {response.update_time.isoformat()}")

    except google.api_core.exceptions.NotFound:
        print(
            f"Error: IntelligenceConfig for project '{project_id}'  not found."
            " Please ensure the project exists."
        )
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"An API error occurred: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END storage_control_projectintelligenceconfig_update]
# [END storage_storagecontrol_projectintelligenceconfig_update]
# [END storage_v2_storagecontrol_projectintelligenceconfig_update]
