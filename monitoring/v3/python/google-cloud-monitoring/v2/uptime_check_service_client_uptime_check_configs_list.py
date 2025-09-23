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

# [START monitoring_v3_uptimecheckservice_uptimecheckconfigs_list]
from google.api_core import exceptions
from google.cloud import monitoring_v3


def list_uptime_check_configs(project_id: str) -> None:
    """
    Lists Uptime check configurations for a Google Cloud project.

    Args:
        project_id: The Google Cloud project ID.
    """
    client = monitoring_v3.UptimeCheckServiceClient()
    project_name = f"projects/{project_id}"

    try:
        request = monitoring_v3.ListUptimeCheckConfigsRequest(
            parent=project_name,
        )

        page_result = client.list_uptime_check_configs(request=request)

        found_checks = False
        for config in page_result:
            found_checks = True
            print("Uptime Check Config")
            print(f"    Display Name: {config.display_name}")
            if config.http_check:
                print(f"    Http Check Path: {config.http_check.path}")
                print(f"    Http Check Port: {config.http_check.port}")
            print(f"    Is Internal: {config.is_internal}")
            print(f"    Name: {config.name}")
            print(f"    Period: {config.period.seconds}s")
            print(f"    Selected Regions: {', '.join(config.selected_regions)}")
            if config.tcp_check:
                print(f"    Tcp Check Port: {config.tcp_check.port}")
            print(f"    Timeout: {config.timeout.seconds}s")

        if not found_checks:
            print("No update check configs found.")

    except exceptions.NotFound as e:
        print(f"Error: Project '{project_id}' not found or inaccessible. Details: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END monitoring_v3_uptimecheckservice_uptimecheckconfigs_list]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists Uptime check configurations for a Google Cloud project."
    )
    parser.add_argument(
        "--project_id", required=True, help="The Google Cloud project ID."
    )
    args = parser.parse_args()
    list_uptime_check_configs(project_id=args.project_id)
