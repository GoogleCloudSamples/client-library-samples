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

# [START bigquerydatatransfer_v1_datatransferservice_unenroll_data_sources]
import google.api_core.exceptions
from google.cloud import bigquery_datatransfer_v1


def unenroll_data_sources(
    project_id: str, location_id: str, data_source_id: str
) -> None:
    """Unenrolls a data source in BigQuery Data Transfer Service.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud location or region for the data transfer (for example, 'us' or 'us-central1').
        data_source_id: The identifier of the data source to unenroll (for example, 'cross_region_copy' or 'scheduled_query').
    """
    client = bigquery_datatransfer_v1.DataTransferServiceClient()

    name = f"projects/{project_id}/locations/{location_id}"

    request = bigquery_datatransfer_v1.UnenrollDataSourcesRequest(
        name=name,
        data_source_ids=[data_source_id],
    )

    try:
        client.unenroll_data_sources(request=request)
        print(f"Successfully unenrolled {data_source_id} from {name}.")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Request failed: {e}")
# [END bigquerydatatransfer_v1_datatransferservice_unenroll_data_sources]
