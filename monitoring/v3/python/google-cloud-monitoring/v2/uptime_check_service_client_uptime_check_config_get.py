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

# [START monitoring_v3_uptimecheckservice_uptimecheckconfig_get]
from google.api_core import exceptions
from google.cloud import monitoring_v3


def get_uptime_check_config(
    project_id: str,
    uptime_check_id: str,
) -> None:
    """
    Retrieve a Google Cloud Monitoring Uptime check configuration.

    Args:
        project_id: Your Google Cloud project ID.
        uptime_check_id: The ID of the Uptime check configuration to retrieve.
    """
    client = monitoring_v3.UptimeCheckServiceClient()

    name = client.uptime_check_config_path(project_id, uptime_check_id)

    try:
        uptime_check_config = client.get_uptime_check_config(name=name)
        print("Uptime Check Config")
        print(f"    Name: {uptime_check_config.name}")
        print(f"    Display Name: {uptime_check_config.display_name}")
        if uptime_check_config.http_check:
            print(f"    Http Check Path: {uptime_check_config.http_check.path}")
            print(f"    Http Check Port: {uptime_check_config.http_check.port}")
        print(f"    Period: {uptime_check_config.period.seconds}s")
        if uptime_check_config.tcp_check:
            print(f"    Tcp Check Port: {uptime_check_config.tcp_check.port}")
        print(f"    Timeout: {uptime_check_config.timeout.seconds}s")

    except exceptions.NotFound:
        print(f"Uptime check configuration '{name}' not found.")
    except Exception as e:
        print(f"An error occurred: {e}")


# [END monitoring_v3_uptimecheckservice_uptimecheckconfig_get]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieve a Google Cloud Monitoring Uptime check configuration."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="Your Google Cloud project ID.",
    )
    parser.add_argument(
        "--uptime_check_id",
        type=str,
        required=True,
        help="The ID of the Uptime check configuration to retrieve.",
    )
    args = parser.parse_args()
    get_uptime_check_config(
        project_id=args.project_id, uptime_check_id=args.uptime_check_id
    )
