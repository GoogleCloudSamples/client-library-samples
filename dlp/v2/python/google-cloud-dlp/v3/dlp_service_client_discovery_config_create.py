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

# [START dlp_v2_dlpservice_discoveryconfig_create]
from google.api_core.exceptions import AlreadyExists
from google.cloud import dlp_v2


def create_discovery_config(project_id: str, location: str, inspect_template_id: int) -> None:
    """
    Creates a new discovery configuration for data profiling.

    A discovery configuration defines how Cloud DLP scans and profiles data in
    your Google Cloud environment. This sample creates a configuration that
    profiles all BigQuery tables monthly.

    The discovery config's ID is dynamically generated on creation.

    Args:
        project_id: The Google Cloud project ID to create the discovery config in.
        location: The Google Cloud region to create the discovery config in (e.g., 'global', 'us-central1').
        inspect_template_id: The ID of the inspect template to link to the discovery config.
    """
    client = dlp_v2.DlpServiceClient()

    # This example profiles all BigQuery tables. You can
    # customize the 'filter' to target specific tables or datasets.
    bigquery_target = dlp_v2.BigQueryDiscoveryTarget(
        filter=dlp_v2.DiscoveryBigQueryFilter(
            other_tables=dlp_v2.DiscoveryBigQueryFilter.AllOtherBigQueryTables()
        ),
        cadence=dlp_v2.DiscoveryGenerationCadence(
            refresh_frequency=dlp_v2.DataProfileUpdateFrequency.UPDATE_FREQUENCY_MONTHLY
        ),
    )
    inspection_template =     name = f"projects/{project_id}/locations/{location}/inspectTemplates/{inspect_template_id}"

    discovery_config = dlp_v2.DiscoveryConfig(
        display_name="My BigQuery Discovery Config",
        status=dlp_v2.DiscoveryConfig.Status.RUNNING,
        targets=[dlp_v2.DiscoveryTarget(big_query_target=bigquery_target)],
        inspect_templates=[inspection_template],
    )

    request = dlp_v2.CreateDiscoveryConfigRequest(
        parent=f"projects/{project_id}/locations/{location}",
        discovery_config=discovery_config,
    )

    try:
        response = client.create_discovery_config(request=request)
        print(f"Successfully created discovery config: {response.name}")
    except AlreadyExists as e:
        print(f"Discovery config already exists: {e}")
        print("Please try a different display name or delete the existing config.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END dlp_v2_dlpservice_discoveryconfig_create]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Creates a new DLP discovery configuration."
    )
    parser.add_argument(
        "--project_id", required=True, type=str, help="The Google Cloud project ID."
    )
    parser.add_argument(
        "--location",
        required=True,
        type=str,
        help="The Google Cloud region (e.g., 'global', 'us-central1').",
    )
    parser.add_argument(
        "--inspect_template_id",
        required=True,
        type=int,
        help="The ID of the inspect template to link to the discovery config.",
    )
    args = parser.parse_args()

    create_discovery_config(args.project_id, args.location, args.inspect_template_id)
