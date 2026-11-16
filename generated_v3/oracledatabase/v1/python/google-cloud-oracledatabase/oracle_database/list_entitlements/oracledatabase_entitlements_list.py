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

# [START oracledatabase_v1_oracledatabase_entitlements_list]
import google.api_core.exceptions
from google.cloud import oracledatabase_v1


def list_entitlements(project_id: str, location_id: str) -> None:
    """Lists entitlements for the Oracle Database service in a location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
    """
    client = oracledatabase_v1.OracleDatabaseClient()
    parent = f"projects/{project_id}/locations/{location_id}"

    request = oracledatabase_v1.ListEntitlementsRequest(
        parent=parent,
    )

    try:
        page_result = client.list_entitlements(request=request)
        count = 0
        for entitlement in page_result:
            count += 1
            print(f"Entitlement name: {entitlement.name}")
            print(f"Entitlement state: {entitlement.state}")
        if count == 0:
            print("No entitlements found.")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END oracledatabase_v1_oracledatabase_entitlements_list]
