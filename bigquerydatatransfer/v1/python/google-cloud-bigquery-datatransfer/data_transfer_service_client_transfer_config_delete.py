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

# [START bigquerydatatransfer_v1_datatransferservice_transferconfig_delete]
# [START bigquerydatatransfer_datatransferservice_transferconfig_delete]
import google.api_core.exceptions
from google.cloud import bigquery_datatransfer_v1

client = bigquery_datatransfer_v1.DataTransferServiceClient()


def delete_transfer_config(
    project_id: str, location: str, transfer_config_id: str
) -> None:
    """Deletes a data transfer configuration, including any associated transfer runs and logs.

    Args:
        project_id: The Google Cloud project ID.
        location: The geographic location of the transfer configuration, for example, "us-central1".
        transfer_config_id: The transfer configuration ID, for example, "1234a-5678-90b1-2c3d-4e5f67890g12".
    """

    name = client.transfer_config_path(
        project=f"{project_id}/locations/{location}",
        transfer_config=transfer_config_id,
    )
    request = bigquery_datatransfer_v1.DeleteTransferConfigRequest(name=name)

    try:
        client.delete_transfer_config(request=request)
        print(f"Deleted transfer config {name}")
    except google.api_core.exceptions.NotFound:
        print(f"Error: Transfer config '{name}' not found.")


# [END bigquerydatatransfer_datatransferservice_transferconfig_delete]
# [END bigquerydatatransfer_v1_datatransferservice_transferconfig_delete]
