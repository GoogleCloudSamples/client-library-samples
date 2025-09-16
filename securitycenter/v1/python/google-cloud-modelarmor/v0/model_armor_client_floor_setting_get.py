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

# [START securitycenter_v1_modelarmor_floorsetting_get]
from google.api_core import exceptions
from google.cloud import modelarmor_v1 as modelarmor


def get_floor_setting(
    project_id: str,
) -> None:
    """
    Retrieves the details of a single floor setting for a given project and location.

    Args:
        project_id: The ID of the Google Cloud project.
    """
    client = modelarmor.ModelArmorClient()

    name = client.floor_setting_path(project=project_id, location="global")

    try:
        floor_setting = client.get_floor_setting(name=name)

        print(f"Successfully retrieved FloorSetting: {floor_setting.name}")
        print(f"  Create Time: {floor_setting.create_time.isoformat()}")
        print(f"  Update Time: {floor_setting.update_time.isoformat()}")
        print(
            f"  Enable Floor Setting Enforcement: {floor_setting.enable_floor_setting_enforcement}"
        )
        print(f"  Filter Config: {floor_setting.filter_config}")

    except exceptions.NotFound:
        print(f"FloorSetting '{name}' not found. It may not have been configured yet.")
    except Exception as e:
        print(f"An error occurred: {e}")


# [END securitycenter_v1_modelarmor_floorsetting_get]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieves a Model Armor floor setting."
    )
    parser.add_argument(
        "--project_id",
        required=True,
        type=str,
        help="The ID of the Google Cloud project.",
    )
    args = parser.parse_args()

    get_floor_setting(args.project_id)
