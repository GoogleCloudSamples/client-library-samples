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

# [START bigquerydatatransfer_v1_datatransferservice_transferruns_list]
import google.api_core.exceptions
from google.cloud import bigquery_datatransfer_v1

client = bigquery_datatransfer_v1.DataTransferServiceClient()


def list_transfer_runs(project_id: str, transfer_config_id: str, location: str) -> None:
    """Lists transfer runs for a given transfer configuration.

    This method retrieves a history of runs for a specific data transfer job.

    Args:
        project_id: The Google Cloud project ID.
        transfer_config_id: The BigQuery DTS transfer configuration ID.
        location: The geographic location of the transfer configuration (e.g., 'us-central1').
    """

    parent = client.transfer_config_path(
        project=f"{project_id}/locations/{location}",
        transfer_config=transfer_config_id,
    )
    request = bigquery_datatransfer_v1.ListTransferRunsRequest(
        parent=parent,
    )

    try:
        pager = client.list_transfer_runs(request=request)
        for run in pager:
            print(f"  Run: {run.name}, State: {run.state.name}")
    except google.api_core.exceptions.NotFound:
        print(
            f"Error: Transfer configuration not found: '{parent}'."
            "Please verify that the project ID, location, and transfer config ID are correct."
        )


# [END bigquerydatatransfer_v1_datatransferservice_transferruns_list]
