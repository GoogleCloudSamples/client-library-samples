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

# [START datamigration_v1_datamigrationservice_fetch_static_ips]
import google.api_core.exceptions
from google.cloud import clouddms_v1


def fetch_static_ips(project_id: str, location_id: str) -> None:
    """Fetches static IP addresses for a Google Cloud region in Database Migration Service.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region (for example, 'us-central1').
    """
    client = clouddms_v1.DataMigrationServiceClient()

    name = f"projects/{project_id}/locations/{location_id}"

    request = clouddms_v1.FetchStaticIpsRequest(
        name=name,
    )

    try:
        page_result = client.fetch_static_ips(request=request)
        for ip_address in page_result:
            print(f"Static IP: {ip_address}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END datamigration_v1_datamigrationservice_fetch_static_ips]
