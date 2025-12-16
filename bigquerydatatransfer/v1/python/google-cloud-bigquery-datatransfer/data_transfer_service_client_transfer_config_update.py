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


# [START bigquerydatatransfer_v1_datatransferservice_transferconfig_update]
# [START bigquerydatatransfer_datatransferservice_transferconfig_update]
# [START bigquerydatatransfer_update_config]
import google.api_core.exceptions
from google.cloud import bigquery_datatransfer_v1
from google.protobuf import field_mask_pb2


client = bigquery_datatransfer_v1.DataTransferServiceClient()


def update_transfer_config(
    project_id: str,
    location: str,
    transfer_config_id: str,
) -> None:
    """Updates a data transfer configuration.

    This sample shows how to update the display name for a transfer
    configuration.

    Args:
        project_id: The Google Cloud project ID.
        location: The geographic location of the transfer config, for example "us-central1"
        transfer_config_id: The transfer configuration ID
    """
    transfer_config_name = client.transfer_config_path(
        project=f"{project_id}/locations/{location}",
        transfer_config=transfer_config_id,
    )

    transfer_config = bigquery_datatransfer_v1.types.TransferConfig(
        name=transfer_config_name,
        display_name="My New Transfer Config display name",
    )
    update_mask = field_mask_pb2.FieldMask(paths=["display_name"])

    try:
        response = client.update_transfer_config(
            transfer_config=transfer_config,
            update_mask=update_mask,
        )

        print(f"Updated transfer config: {response.name}")
        print(f"New display name: {response.display_name}")
    except google.api_core.exceptions.NotFound:
        print(f"Error: Transfer config '{transfer_config_name}' not found.")


# [END bigquerydatatransfer_update_config]
# [END bigquerydatatransfer_datatransferservice_transferconfig_update]
# [END bigquerydatatransfer_v1_datatransferservice_transferconfig_update]
