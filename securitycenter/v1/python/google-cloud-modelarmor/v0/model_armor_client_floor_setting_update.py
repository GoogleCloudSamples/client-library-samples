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


# [START securitycenter_v1_modelarmor_floorsetting_update]
from google.api_core import exceptions
from google.cloud import modelarmor_v1 as modelarmor
from google.protobuf import field_mask_pb2


def update_floor_setting(
    project_id: str,
) -> None:
    """
    Updates a floor setting for a given project and location.

    A floor setting defines the baseline security posture for AI models within
    a project or organization, specifying default filtering rules and
    enforcement actions. This sample demonstrates how to update the enforcement
    status and AI Platform specific settings of an existing floor setting.

    Args:
        project_id: The Google Cloud project ID.
    """
    client = modelarmor.ModelArmorClient()

    floor_setting_name = client.floor_setting_path(
        project=project_id, location="global"
    )

    # Define the updated floor setting object.
    # For this example, we will enable floor setting enforcement and
    # configure AI Platform to use 'inspect_only' mode with Cloud Logging enabled.
    updated_floor_setting = modelarmor.FloorSetting(
        name=floor_setting_name,
        enable_floor_setting_enforcement=True,
        ai_platform_floor_setting=modelarmor.AiPlatformFloorSetting(
            inspect_only=True,
            enable_cloud_logging=True,
        ),
        # A filter_config is required for a valid FloorSetting. If you are
        # only updating other fields, ensure you include the existing filter_config
        # or provide a new one.
        filter_config=modelarmor.FilterConfig(
            rai_settings=modelarmor.RaiFilterSettings(
                rai_filters=[
                    modelarmor.RaiFilterSettings.RaiFilter(
                        filter_type=modelarmor.RaiFilterType.HATE_SPEECH,
                        confidence_level=modelarmor.DetectionConfidenceLevel.LOW_AND_ABOVE,
                    )
                ]
            )
        ),
    )

    # Create an update mask to specify which fields to update.
    # Only fields present in the update mask will be modified.
    # Here, we are updating 'enable_floor_setting_enforcement',
    # 'ai_platform_floor_setting.inspect_only', 'ai_platform_floor_setting.enable_cloud_logging',
    # and 'filter_config'.
    update_mask = field_mask_pb2.FieldMask(
        paths=[
            "enable_floor_setting_enforcement",
            "ai_platform_floor_setting.inspect_only",
            "ai_platform_floor_setting.enable_cloud_logging",
            "filter_config",
        ]
    )

    request = modelarmor.UpdateFloorSettingRequest(
        floor_setting=updated_floor_setting,
        update_mask=update_mask,
    )

    try:
        response = client.update_floor_setting(request=request)

        print(f"Updated FloorSetting: {response.name}")
        print(f"  Enable enforcement: {response.enable_floor_setting_enforcement}")
        if response.ai_platform_floor_setting:
            print(
                f"  AI Platform Inspect Only: {response.ai_platform_floor_setting.inspect_only}"
            )
            print(
                f"  AI Platform Enable Cloud Logging: {response.ai_platform_floor_setting.enable_cloud_logging}"
            )
        if response.filter_config and response.filter_config.rai_settings:
            print(f"  RAI Filters configured:")
            for rai_filter in response.filter_config.rai_settings.rai_filters:
                print(
                    f"    - Type: {modelarmor.RaiFilterType(rai_filter.filter_type).name}, Confidence: {modelarmor.DetectionConfidenceLevel(rai_filter.confidence_level).name}"
                )

    except exceptions.NotFound as e:
        print(
            f"Error: Floor setting not found for {floor_setting_name}. Please ensure the project and location are correct. Details: {e}"
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END securitycenter_v1_modelarmor_floorsetting_update]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Updates a Model Armor floor setting.")
    parser.add_argument(
        "--project_id",
        required=True,
        type=str,
        help="Your Google Cloud project ID.",
    )
    args = parser.parse_args()

    update_floor_setting(args.project_id)
