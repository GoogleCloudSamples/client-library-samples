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

# [START dataplex_v1_datascanservice_run_data_scan]
import google.api_core.exceptions
from google.cloud import dataplex_v1


def run_data_scan(project_id: str, location_id: str, data_scan_id: str) -> None:
    """Runs a data scan in Google Cloud Dataplex.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        data_scan_id: The identifier of the data scan (for example, 'example-datascan-id').
    """
    client = dataplex_v1.DataScanServiceClient()

    name = f"projects/{project_id}/locations/{location_id}/dataScans/{data_scan_id}"

    request = dataplex_v1.RunDataScanRequest(
        name=name,
    )

    try:
        response = client.run_data_scan(request=request)
        print(f"Triggered data scan job: {response.job.name}")
        print(f"Job state: {response.job.state.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to run data scan: {error}")
# [END dataplex_v1_datascanservice_run_data_scan]
