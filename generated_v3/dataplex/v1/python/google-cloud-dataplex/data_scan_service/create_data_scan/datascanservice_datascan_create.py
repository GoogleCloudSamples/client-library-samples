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

# [START dataplex_v1_datascanservice_datascan_create]
import google.api_core.exceptions
from google.cloud import dataplex_v1

client = dataplex_v1.DataScanServiceClient()


def create_data_scan(project_id: str, location_id: str) -> None:
    """Creates a data scan in Dataplex.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
    """
    parent = f"projects/{project_id}/locations/{location_id}"
    data_scan_id = "example-data-scan"

    data_source = dataplex_v1.DataSource(
        resource=f"//bigquery.googleapis.com/projects/{project_id}/datasets/example_dataset/tables/example_table"
    )
    data_scan = dataplex_v1.DataScan(
        data=data_source,
        data_profile_spec=dataplex_v1.DataProfileSpec(),
        description="Example data profile scan.",
    )

    try:
        operation = client.create_data_scan(
            parent=parent,
            data_scan=data_scan,
            data_scan_id=data_scan_id,
        )
        response = operation.result()
        print(f"Created data scan: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to create data scan: {e}")
# [END dataplex_v1_datascanservice_datascan_create]
