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

# [START bigquerydatatransfer_v1_datatransferservice_transferrun_delete]
# [START bigquerydatatransfer_datatransferservice_transferrun_delete]
import google.api_core.exceptions
from google.cloud import bigquery_datatransfer_v1

client = bigquery_datatransfer_v1.DataTransferServiceClient()


def delete_transfer_run(
    project_id: str,
    location: str,
    transfer_config_id: str,
    run_id: str,
) -> None:
    """Deletes a transfer run.

    A transfer run is a single execution of a data transfer configuration.
    This action is useful for cleaning up failed or unnecessary transfer
    executions.

    Args:
        project_id: The Google Cloud project ID.
        location: The geographic location of the transfer run.
        transfer_config_id: The transfer configuration ID.
        run_id: The transfer run ID.
    """
    run_name = client.run_path(
        project=f"{project_id}/locations/{location}",
        transfer_config=transfer_config_id,
        run=run_id,
    )

    try:
        client.delete_transfer_run(name=run_name)
        print(f"Deleted transfer run {run_name}")
    except google.api_core.exceptions.NotFound:
        print(f"Error: Transfer run '{run_name}' not found.")


# [END bigquerydatatransfer_datatransferservice_transferrun_delete]
# [END bigquerydatatransfer_v1_datatransferservice_transferrun_delete]
