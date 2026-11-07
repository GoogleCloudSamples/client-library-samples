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

# [START dataplex_v1_datascanservice_datascans_list]
import google.api_core.exceptions
from google.cloud import dataplex_v1


def list_data_scans(project_id: str, location_id: str) -> None:
    """Lists data scans in a Google Cloud project and location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
    """
    client = dataplex_v1.DataScanServiceClient()
    parent = f"projects/{project_id}/locations/{location_id}"

    request = dataplex_v1.ListDataScansRequest(
        parent=parent,
    )

    try:
        page_result = client.list_data_scans(request=request)
        for data_scan in page_result:
            print(f"Data scan name: {data_scan.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to list data scans: {e}")


# [END dataplex_v1_datascanservice_datascans_list]
