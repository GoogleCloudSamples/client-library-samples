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

# [START bigquerydatatransfer_v1_datatransferservice_transferlogs_list]

import google.api_core.exceptions
from google.cloud import bigquery_datatransfer_v1

client = bigquery_datatransfer_v1.DataTransferServiceClient()


def list_transfer_logs(
    project_id: str, location: str, transfer_config_id: str, run_id: str
) -> None:
    """Prints the transfer logs for a given transfer run.

    This sample shows how to retrieve the logs for a specific transfer run,
    which can be useful for debugging and monitoring transfer jobs.

    Args:
        project_id: The Google Cloud project ID.
        location: The geographic location of the transfer configuration (e.g., 'us-central1').
        transfer_config_id: The ID of the transfer configuration.
        run_id: The ID of the transfer run.
    """

    parent = client.run_path(
        f"{project_id}/locations/{location}", transfer_config_id, run_id
    )

    try:
        pager = client.list_transfer_logs(parent=parent)

        print(f"Logs for transfer run {run_id}:")
        for log in pager:
            print(f"  - {log.severity.name}: {log.message_text}")

    except google.api_core.exceptions.NotFound:
        print(
            f"Error: Transfer run '{run_id}' not found in project '{project_id}' location '{location}'."
        )


# [END bigquerydatatransfer_v1_datatransferservice_transferlogs_list]
