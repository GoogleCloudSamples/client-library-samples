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

# [START bigquerydatatransfer_v1_datatransferservice_transferconfig_get]
import google.api_core.exceptions
from google.cloud import bigquery_datatransfer_v1

client = bigquery_datatransfer_v1.DataTransferServiceClient()


def get_transfer_config(
    project_id: str,
    location: str,
    transfer_config_id: str,
) -> None:
    """Gets information about a data transfer configuration.

    This sample demonstrates how to retrieve the details of a BigQuery
    Data Transfer Service configuration, which contains metadata about a
    data transfer, such as its schedule and destination.

    Args:
        project_id: The Google Cloud project ID.
        location: The geographic location of the transfer config, for example "us-central1"
        transfer_config_id: The transfer configuration ID
    """

    try:
        transfer_config_name = client.transfer_config_path(
            project=f"{project_id}/locations/{location}",
            transfer_config=transfer_config_id,
        )
        transfer_config = client.get_transfer_config(name=transfer_config_name)

        print(f"Got transfer config: {transfer_config.name}")
        print(f"Display name: {transfer_config.display_name}")
        print(f"Destination dataset: {transfer_config.destination_dataset_id}")
        print(f"Data source: {transfer_config.data_source_id}")
        if "time_based_schedule" in transfer_config.schedule_options_v2:
            print(
                f"Schedule: {transfer_config.schedule_options_v2.time_based_schedule.schedule}"
            )
        else:
            print("Schedule: None")
    except google.api_core.exceptions.NotFound:
        print(f"Error: Transfer config '{transfer_config_name}' not found.")


# [END bigquerydatatransfer_v1_datatransferservice_transferconfig_get]
