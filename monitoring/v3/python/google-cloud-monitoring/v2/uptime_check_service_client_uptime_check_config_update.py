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

# [START monitoring_v3_uptimecheckservice_uptimecheckconfig_update]
from google.api_core import exceptions
from google.cloud import monitoring_v3
from google.protobuf import field_mask_pb2


def update_uptime_check_config(
    project_id: str,
    uptime_check_id: str,
) -> None:
    """
    Updates an existing Uptime check configuration.

    Args:
        project_id: The Google Cloud project ID.
        uptime_check_id: The ID of the Uptime check configuration to update.
    """
    client = monitoring_v3.UptimeCheckServiceClient()
    name = client.uptime_check_config_path(project_id, uptime_check_id)

    try:
        existing_config = client.get_uptime_check_config(name=name)

        existing_config.display_name = "My updated display name"

        update_mask = field_mask_pb2.FieldMask(paths=["display_name", "timeout"])

        request = monitoring_v3.UpdateUptimeCheckConfigRequest(
            uptime_check_config=existing_config,
            update_mask=update_mask,
        )

        response = client.update_uptime_check_config(request=request)

        print("Uptime Check Config")
        print(f"    Display Name: {response.display_name}")
        print(f"    Name: {response.name}")
        print(f"    Timeout: {response.timeout.seconds}s")

    except exceptions.NotFound:
        print(f"Error: Uptime check config '{name}' not found.")
    except exceptions.GoogleAPICallError as e:
        print(f"Error updating Uptime check config: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END monitoring_v3_uptimecheckservice_uptimecheckconfig_update]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Updates an existing Uptime check configuration."
    )
    parser.add_argument(
        "--project_id",
        required=True,
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--uptime_check_id",
        required=True,
        help="The ID of the Uptime check configuration to update.",
    )

    args = parser.parse_args()
    update_uptime_check_config(
        project_id=args.project_id,
        uptime_check_id=args.uptime_check_id,
    )
