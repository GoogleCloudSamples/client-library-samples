# Copyright 2026 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# [START bigquerydatatransfer_v1_datatransferservice_datasource_get]
from google.api_core import exceptions
from google.cloud import bigquery_datatransfer_v1


def get_data_source(project_id: str, data_source_id: str, location_id: str) -> None:
    """Gets metadata for a specified data source.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        data_source_id: The data source identifier (for example, 'google_cloud_storage').
        location_id: The Google Cloud region or location for the data source (for example, 'us' or 'us-central1').
    """
    client = bigquery_datatransfer_v1.DataTransferServiceClient()

    name = (
        f"projects/{project_id}/locations/{location_id}/dataSources/{data_source_id}"
    )

    request = bigquery_datatransfer_v1.GetDataSourceRequest(
        name=name,
    )

    try:
        response = client.get_data_source(request=request)
        print(f"Data source name: {response.name}")
        print(f"Display name: {response.display_name}")
        print(f"Description: {response.description}")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve data source: {error}")
# [END bigquerydatatransfer_v1_datatransferservice_datasource_get]
