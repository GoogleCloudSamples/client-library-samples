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

# [START bigquerydatatransfer_v1_datatransferservice_datasource_get]
import google.api_core.exceptions
from google.cloud import bigquery_datatransfer_v1

client = bigquery_datatransfer_v1.DataTransferServiceClient()


def get_data_source(project_id: str, data_source_id: str) -> None:
    """Retrieves a data source definition by name.

    This sample shows how to get a data source definition, which includes its
    display name, description, and other properties.

    Args:
        project_id: The Google Cloud project ID.
        data_source_id: The data source ID, for example, 'google_cloud_storage'.
    """
    name = client.data_source_path(project=project_id, data_source=data_source_id)

    try:
        response = client.get_data_source(name=name)
        print(f"Retrieved data source: {response.name}")
        print(f"Display Name: {response.display_name}")
        print(f"Description: {response.description}")
        print(f"Client ID: {response.client_id}")
        print(f"Supports custom schedule: {response.supports_custom_schedule}")
    except google.api_core.exceptions.NotFound:
        print(f"Error: Data source '{name}' was not found.")


# [END bigquerydatatransfer_v1_datatransferservice_datasource_get]
