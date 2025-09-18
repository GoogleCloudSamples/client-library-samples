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

# [START dlp_v2_dlpservice_discoveryconfig_delete]
from google.api_core.exceptions import NotFound
from google.cloud import dlp_v2


def delete_discovery_config(
    project_id: str,
    location: str,
    discovery_config_id: str,
) -> None:
    """
    Deletes a discovery configuration.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud region to use, e.g. 'us-central1'.
        discovery_config_id: The ID of the discovery config to delete.
    """
    client = dlp_v2.DlpServiceClient()

    name = client.discovery_config_path(project_id, location, discovery_config_id)

    try:
        client.delete_discovery_config(name=name)
        print(f"Successfully deleted discovery config: {name}")
    except NotFound:
        print(f"Discovery config {name} not found.")
    except Exception as e:
        print(f"Error deleting discovery config {name}: {e}")


# [END dlp_v2_dlpservice_discoveryconfig_delete]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Deletes a discovery configuration.")
    parser.add_argument(
        "--project_id",
        help="The Google Cloud project ID.",
        required=True,
    )
    parser.add_argument(
        "--location",
        help="The Google Cloud region to use, e.g. 'us-central1'.",
        required=True,
    )
    parser.add_argument(
        "--discovery_config_id",
        help="The ID of the discovery config to delete.",
        required=True,
    )
    args = parser.parse_args()

    delete_discovery_config(
        args.project_id,
        args.location,
        args.discovery_config_id,
    )
