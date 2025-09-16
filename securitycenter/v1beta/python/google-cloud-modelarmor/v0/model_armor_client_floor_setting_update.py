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

# [START securitycenter_v1beta_modelarmor_floorsetting_update]
from google.api_core.exceptions import NotFound
from google.cloud import modelarmor_v1beta as modelarmor
from google.protobuf import field_mask_pb2


def update_floor_setting(
    project_id: str,
) -> None:
    """
    Updates the floor setting for a given project and location.

    The floor setting defines baseline security configurations for Model Armor
    filters across an entire project or organization. This sample demonstrates
    how to update the Responsible AI (RAI) filter settings and enable
    floor setting enforcement.

    Args:
        project_id: The Google Cloud project ID.
    """
    client = modelarmor.ModelArmorClient()

    # Construct the full resource name for the floor setting.
    # Floor settings are typically named 'floorSetting' under a location.
    floor_setting_name = client.floor_setting_path(
        project=project_id, location="global"
    )

    # Define the updated Responsible AI (RAI) filter settings.
    # For this example, we'll enable SEXUALLY_EXPLICIT and HATE_SPEECH filters
    # with HIGH confidence levels.
    rai_filters = [
        modelarmor.RaiFilterSettings.RaiFilter(
            filter_type=modelarmor.RaiFilterType.SEXUALLY_EXPLICIT,
            confidence_level=modelarmor.DetectionConfidenceLevel.HIGH,
        ),
        modelarmor.RaiFilterSettings.RaiFilter(
            filter_type=modelarmor.RaiFilterType.HATE_SPEECH,
            confidence_level=modelarmor.DetectionConfidenceLevel.HIGH,
        ),
    ]

    # Construct the FloorSetting object with the fields to be updated.
    # The 'name' field is required to identify the resource.
    floor_setting = modelarmor.FloorSetting(
        name=floor_setting_name,
        enable_floor_setting_enforcement=True,
        # A filter_config is required for a valid FloorSetting. If you are
        # only updating other fields, ensure you include the existing filter_config
        # or provide a new one.
        filter_config=modelarmor.FilterConfig(
            rai_settings=modelarmor.RaiFilterSettings(rai_filters=rai_filters)
        ),
    )

    # Create a FieldMask to specify which fields of the FloorSetting are being updated.
    # Only the fields listed here will be modified; others will remain unchanged.
    update_mask = field_mask_pb2.FieldMask(
        paths=[
            "filter_config.rai_settings.rai_filters",
            "enable_floor_setting_enforcement",
        ]
    )

    try:
        operation = client.update_floor_setting(
            floor_setting=floor_setting, update_mask=update_mask
        )

        print(f"Updated FloorSetting: {operation.name}")
        print(
            f"  RAI Filters enabled: {operation.filter_config.rai_settings.rai_filters}"
        )
        print(f"  Enforcement enabled: {operation.enable_floor_setting_enforcement}")
        print(f"  Updated at: {operation.update_time.isoformat()}")

    except NotFound:
        print(
            f"Error: Floor setting '{floor_setting_name}' not found. "
            "Please ensure the project and location are correct and that a floor setting exists."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END securitycenter_v1beta_modelarmor_floorsetting_update]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Updates a Model Armor floor setting.")
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="Your Google Cloud project ID.",
    )

    args = parser.parse_args()

    update_floor_setting(args.project_id)
