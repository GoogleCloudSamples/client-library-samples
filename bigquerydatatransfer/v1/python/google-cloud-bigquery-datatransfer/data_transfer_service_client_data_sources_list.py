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

# [START bigquerydatatransfer_v1_datatransferservice_datasources_list]
import google.api_core.exceptions
from google.cloud import bigquery_datatransfer_v1


client = bigquery_datatransfer_v1.DataTransferServiceClient()


def list_data_sources(project_id: str) -> None:
    """Lists all available data sources.

    This shows what types of transfers can be created.

    Args:
        project_id: The Google Cloud project ID.
    """

    parent = f"projects/{project_id}"
    request = bigquery_datatransfer_v1.ListDataSourcesRequest(
        parent=parent,
    )

    try:
        page_result = client.list_data_sources(request=request)
        print("Data sources:")
        for data_source in page_result:
            print(f"\tName: {data_source.name}")
            print(f"\tID: {data_source.data_source_id}")
            print(f"\tDisplay Name: {data_source.display_name}")
            print(f"\tDescription: {data_source.description}")
    except google.api_core.exceptions.NotFound:
        print(f"Error: Project '{project_id}' not found.")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Error: An error occurred: {e}")
    # [END bigquerydatatransfer_v1_datatransferservice_datasources_list]
