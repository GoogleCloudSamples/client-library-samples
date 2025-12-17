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

# [START dlp_v2_dlpservice_discoveryconfig_update]
from google.api_core.exceptions import NotFound
from google.cloud import dlp_v2
from google.protobuf import field_mask_pb2


def update_discovery_config(
    project_id: str, location: str, discovery_config_id: str
) -> None:
    """Updates an existing discovery configuration.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud location (e.g., 'global', 'us-central1').
        discovery_config_id: The ID of the discovery configuration to update.
    """
    # Instantiate a client
    client = dlp_v2.DlpServiceClient()

    name = client.discovery_config_path(project_id, location, discovery_config_id)

    # Define the updated discovery configuration.
    # For this example, we'll change its status to PAUSED.
    discovery_config = dlp_v2.DiscoveryConfig(
        status=dlp_v2.DiscoveryConfig.Status.PAUSED
    )

    # Create a field mask to specify which fields to update.
    # This is crucial for partial updates. Only fields specified in the mask
    # will be updated; others will remain unchanged.
    update_mask = field_mask_pb2.FieldMask(paths=["status"])

    try:
        response = client.update_discovery_config(
            name=name, discovery_config=discovery_config, update_mask=update_mask
        )

        print(f"Successfully updated discovery config: {response.name}")
        print(f"New status: {response.status.name}")

    except NotFound:
        print(f"Error: Discovery config '{discovery_config_id}' not found.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END dlp_v2_dlpservice_discoveryconfig_update]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Updates an existing DLP discovery configuration."
    )
    parser.add_argument(
        "--project_id",
        required=True,
        type=str,
        help="The Google Cloud project ID to which the discovery config belongs.",
    )
    parser.add_argument(
        "--location",
        required=True,
        type=str,
        help="The Google Cloud location of the discovery config (e.g., 'global', 'us-central1').",
    )
    parser.add_argument(
        "--discovery_config_id",
        required=True,
        type=str,
        help="The ID of the discovery configuration to update (e.g., 'my-discovery-config-123').",
    )
    args = parser.parse_args()

    update_discovery_config(args.project_id, args.location, args.discovery_config_id)
