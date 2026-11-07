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

# [START dataplex_v1_datascanservice_datascan_get]
import google.api_core.exceptions
from google.cloud import dataplex_v1

client = dataplex_v1.DataScanServiceClient()


def get_data_scan(project_id: str, location_id: str, data_scan_id: str) -> None:
    """Retrieves details of a DataScan resource in Google Cloud Dataplex.

    Args:
        project_id: The Google Cloud project ID (for example,
          'example-project-id')
        location_id: The Google Cloud region where the service is located (for
          example, 'us-central1')
        data_scan_id: ID of the DataScan (for example, 'example-datascan-id')
    """
    name = client.data_scan_path(project_id, location_id, data_scan_id)

    request = dataplex_v1.GetDataScanRequest(
        name=name,
    )

    try:
        response = client.get_data_scan(request=request)
        print(f"Retrieved data scan: {response.name}")
        print(f"Data scan state: {response.state.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")


# [END dataplex_v1_datascanservice_datascan_get]
