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

# [START dlp_v2_dlpservice_discoveryconfig_get]
from google.api_core.exceptions import NotFound
from google.cloud import dlp_v2


def get_discovery_config(
    project_id: str,
    location: str,
    discovery_config_id: str,
) -> None:
    """
    Retrieves a specified DiscoveryConfig.

    A DiscoveryConfig defines how Sensitive Data Protection scans and profiles
    data across your organization or project. This sample demonstrates how to
    fetch the details of an existing configuration.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud region to use, e.g., 'global', 'us-central1'.
        discovery_config_id: The ID of the discovery configuration to retrieve.
    """
    client = dlp_v2.DlpServiceClient()

    name = client.discovery_config_path(project_id, location, discovery_config_id)

    try:
        discovery_config = client.get_discovery_config(name=name)

        print(f"Successfully retrieved DiscoveryConfig: {discovery_config.name}")
        print(f"Display Name: {discovery_config.display_name}")
        print(f"Status: {discovery_config.status.name}")
        if discovery_config.inspect_templates:
            print(f"Inspect Templates: {', '.join(discovery_config.inspect_templates)}")
        if discovery_config.targets:
            print("Targets:")
            for target in discovery_config.targets:
                if target.big_query_target:
                    print(
                        f"  - BigQuery Target: {target.big_query_target.filter.big_query_table_collection.include_regexes.patterns}"
                    )
                # Add more target types as needed

    except NotFound:
        print(f"Error: Discovery config '{name}' not found.")
        print(
            "Please ensure the project ID, location, and discovery config ID are correct and the config exists."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END dlp_v2_dlpservice_discoveryconfig_get]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieves a specified DLP DiscoveryConfig."
    )
    parser.add_argument(
        "--project_id", required=True, type=str, help="The Google Cloud project ID."
    )
    parser.add_argument(
        "--location",
        required=True,
        type=str,
        help="The Google Cloud region to use, e.g., 'global', 'us-central1'.",
    )
    parser.add_argument(
        "--discovery_config_id",
        required=True,
        type=str,
        help="The ID of the discovery configuration to retrieve.",
    )

    args = parser.parse_args()

    get_discovery_config(
        args.project_id,
        args.location,
        args.discovery_config_id,
    )
