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

# [START bigquerydatatransfer_v1_datatransferservice_datasources_list]
import google.api_core.exceptions
from google.cloud import bigquery_datatransfer_v1


def list_data_sources(project_id: str, location_id: str) -> None:
    """Lists supported BigQuery Data Transfer Service data sources.

    Args:
        project_id: The Google Cloud project ID (for example,
          'example-project-id').
        location_id: The Google Cloud region or location (for example, 'us' or
          'us-central1').
    """
    client = bigquery_datatransfer_v1.DataTransferServiceClient()
    parent = f"projects/{project_id}/locations/{location_id}"

    try:
        response = client.list_data_sources(parent=parent)
        for data_source in response:
            print(f"Data source ID: {data_source.data_source_id}")
            print(f"Display name: {data_source.display_name}")
            print(f"Description: {data_source.description}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END bigquerydatatransfer_v1_datatransferservice_datasources_list]
