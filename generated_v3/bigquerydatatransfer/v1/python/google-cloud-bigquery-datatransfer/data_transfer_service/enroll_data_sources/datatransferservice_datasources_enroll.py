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

# [START bigquerydatatransfer_v1_datatransferservice_enroll_data_sources]
from google.api_core import exceptions
from google.cloud import bigquery_datatransfer_v1


def enroll_data_sources(
    project_id: str, location_id: str, data_source_id: str
) -> None:
    """Enrolls data sources for a project in a specified location.

    Args:
        project_id: Google Cloud project ID where data sources are enrolled (for example, 'example-project-id').
        location_id: Google Cloud location ID (for example, 'us' or 'us-central1').
        data_source_id: Identifier of the data source to enroll (for example, 'youtube_channel').
    """
    client = bigquery_datatransfer_v1.DataTransferServiceClient()
    name = f"projects/{project_id}/locations/{location_id}"

    request = bigquery_datatransfer_v1.EnrollDataSourcesRequest(
        name=name,
        data_source_ids=[data_source_id],
    )

    try:
        client.enroll_data_sources(request=request)
        print(f"Data source '{data_source_id}' enrolled successfully for {name}.")
    except exceptions.GoogleAPICallError as e:
        print(f"Failed to enroll data source: {e}")
# [END bigquerydatatransfer_v1_datatransferservice_enroll_data_sources]
