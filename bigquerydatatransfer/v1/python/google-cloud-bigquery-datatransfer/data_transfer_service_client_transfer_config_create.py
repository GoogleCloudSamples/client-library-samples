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

# [START bigquerydatatransfer_v1_datatransferservice_transferconfig_create]
# [START bigquerydatatransfer_datatransferservice_transferconfig_create]
import google.api_core.exceptions
from google.cloud import bigquery_datatransfer_v1
from google.protobuf import struct_pb2

client = bigquery_datatransfer_v1.DataTransferServiceClient()


def create_transfer_config(
    project_id: str,
    location: str,
    source_cloud_storage_uri: str,
    destination_dataset_id: str,
    destination_table_name: str,
    service_account: str = None,
) -> None:
    """Creates a transfer configuration for a Google Cloud Storage transfer.

    This sample demonstrates how to create a transfer configuration for a
    one-time Google Cloud Storage transfer. It specifies the source data path,
    destination table, and other parameters for the transfer.

    Args:
        project_id: The Google Cloud project ID.
        location: The geographic location of the transfer config, for example "us-central1"
        source_data_path: The Cloud Storage URL of the source data, for example "gs://example-bucket/example-data.csv"
        destination_dataset_id: The BigQuery dataset ID to which data is transferred.
        destination_table_name: The BigQuery table name to which data is transferred.
            Cloud Storage transfers support runtime parameters https://docs.cloud.google.com/bigquery/docs/gcs-transfer-parameters
        service_account: The optional IAM Service Account to use as the transfer owner. Otherwise, the current user is the owner.
    """

    parent = f"projects/{project_id}/locations/{location}"
    data_source_id = "google_cloud_storage"
    params = struct_pb2.Struct()
    params.update(
        {
            "data_path_template": source_cloud_storage_uri,
            "destination_table_name_template": destination_table_name,
            "file_format": "CSV",
            "skip_leading_rows": "1",  # assumes the first line in the CSV is the header
        }
    )
    transfer_config = bigquery_datatransfer_v1.TransferConfig(
        display_name="My Cloud Storage Data Transfer",
        data_source_id=data_source_id,
        destination_dataset_id=destination_dataset_id,
        params=params,
    )

    try:
        request = bigquery_datatransfer_v1.CreateTransferConfigRequest(
            parent=parent,
            transfer_config=transfer_config,
            service_account_name=service_account,
        )

        response = client.create_transfer_config(request=request)
        print(f"Created transfer config: {response.name}")
    except google.api_core.exceptions.InvalidArgument as e:
        print(
            f"Error: Could not create transfer config due to an invalid argument: {e}. Please check the destination dataset and other parameters."
        )
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Error: Could not create transfer config: {e}")


# [END bigquerydatatransfer_datatransferservice_transferconfig_create]
# [END bigquerydatatransfer_v1_datatransferservice_transferconfig_create]
