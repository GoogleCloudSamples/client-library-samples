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

# [START dlp_v2_dlpservice_discoveryconfigs_list]
from google.api_core import exceptions
from google.cloud import dlp_v2


def list_discovery_configs(project_id: str, location: str) -> None:
    """Lists discovery configurations for a given project and location.

    This sample demonstrates how to retrieve a list of data discovery
    configurations, which are used to scan and profile storage resources.
    Each configuration defines what data to scan and how often to update
    the data profiles.

    Args:
        project_id: The Google Cloud project ID.
        location: The geographic location to list discovery configurations from.
                  Can be 'global' or a specific region like 'us-central1'.
    """
    client = dlp_v2.DlpServiceClient()
    parent = f"projects/{project_id}/locations/{location}"

    try:
        response = client.list_discovery_configs(parent=parent)

        print(f"Discovery Configurations in {parent}:")
        found_configs = False
        for config in response:
            found_configs = True
            print(f"  - Name: {config.name}")
            print(f"    Display Name: {config.display_name}")
            print(f"    Status: {config.status.name}")
            if config.last_run_time:
                print(
                    f"    Last Run Time: {config.last_run_time.ToDatetime().isoformat()}"
                )
            else:
                print("    Last Run Time: Not available")

        if not found_configs:
            print("No discovery configurations found.")

    except exceptions.NotFound:
        print(f"Error: The specified parent resource '{parent}' was not found.")
        print("Please ensure the project ID and location are correct.")
    except exceptions.GoogleAPIError as e:
        print(f"An API error occurred: {e}")
        print("Please check your input parameters and permissions.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END dlp_v2_dlpservice_discoveryconfigs_list]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Lists DLP discovery configurations.")
    parser.add_argument(
        "--project_id", required=True, type=str, help="The Google Cloud project ID."
    )
    parser.add_argument(
        "--location",
        required=True,
        type=str,
        help="The geographic location (e.g., 'global', 'us-central1').",
    )
    args = parser.parse_args()

    list_discovery_configs(args.project_id, args.location)
