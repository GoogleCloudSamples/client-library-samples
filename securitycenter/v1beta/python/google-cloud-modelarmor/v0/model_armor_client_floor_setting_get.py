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


# [START securitycenter_v1beta_modelarmor_floorsetting_get]
from google.api_core import exceptions
from google.cloud import modelarmor_v1beta as modelarmor


def get_floor_setting(project_id: str) -> None:
    """
    Retrieves the floor setting for a given project and location.

    The floor setting defines baseline security configurations that apply across
    the specified project or organization. This sample demonstrates how to fetch
    these settings.

    Args:
        project_id: The Google Cloud project ID.
    """
    client = modelarmor.ModelArmorClient()

    # Construct the full resource name for the floor setting.
    floor_setting_name = client.floor_setting_path(
        project=project_id, location="global"
    )

    try:
        floor_setting = client.get_floor_setting(name=floor_setting_name)

        print(f"Successfully retrieved floor setting: {floor_setting.name}")
        print(f"  Create Time: {floor_setting.create_time.isoformat()}")
        print(f"  Update Time: {floor_setting.update_time.isoformat()}")
        print(
            f"  Enforcement Enabled: {floor_setting.enable_floor_setting_enforcement}"
        )
        print(
            f"  Integrated Services: {', '.join(str(s.name) for s in floor_setting.integrated_services)}"
        )
        if floor_setting.filter_config:
            print(f"  Filter Config Present: True")
            if floor_setting.filter_config.rai_settings:
                print(f"    RAI Filters:")
                for rai_filter in floor_setting.filter_config.rai_settings.rai_filters:
                    print(
                        f"      - Type: {rai_filter.filter_type.name}, Confidence: {rai_filter.confidence_level.name}"
                    )

    except exceptions.NotFound:
        print(f"Error: Floor setting '{floor_setting_name}' not found.")
        print(
            "Please ensure the project ID and location are correct and a floor setting exists."
        )
    except Exception as e:
        print(f"Failed to retrieve floor setting due to an unexpected error: {e}")


# [END securitycenter_v1beta_modelarmor_floorsetting_get]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieve a Model Armor floor setting."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="Your Google Cloud project ID.",
    )
    args = parser.parse_args()

    get_floor_setting(args.project_id)
