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

# [START bigquerydatatransfer_v1_datatransferservice_transferconfigs_list]
# [START bigquerydatatransfer_datatransferservice_transferconfigs_list]
# [START bigquerydatatransfer_list_configs]
import google.api_core.exceptions
from google.cloud import bigquery_datatransfer_v1

client = bigquery_datatransfer_v1.DataTransferServiceClient()


def list_transfer_configs(project_id: str, location: str) -> None:
    """Lists transfer configurations in a given project.

    This sample demonstrates how to list all transfer configurations in a project.

    Args:
        project_id: The Google Cloud project ID.
        location: The geographic location of the transfer config, for example "us-central1"
    """

    parent = client.common_location_path(project_id, location)

    try:
        for config in client.list_transfer_configs(parent=parent):
            print(f"Name: {config.name}")
            print(f"Display Name: {config.display_name}")
            print(f"Data source: {config.data_source_id}")
            print(f"Destination dataset: {config.destination_dataset_id}")
            if "time_based_schedule" in config.schedule_options_v2:
                print(
                    f"Schedule: {config.schedule_options_v2.time_based_schedule.schedule}"
                )
            else:
                print("Schedule: None")
            print("---")
    except google.api_core.exceptions.NotFound:
        print(
            f"Error: Project '{project_id}' not found or contains no transfer configs."
        )
    except google.api_core.exceptions.PermissionDenied:
        print(
            f"Error: Permission denied for project '{project_id}'. Please ensure you have the correct permissions."
        )


# [END bigquerydatatransfer_list_configs]
# [END bigquerydatatransfer_datatransferservice_transferconfigs_list]
# [END bigquerydatatransfer_v1_datatransferservice_transferconfigs_list]
