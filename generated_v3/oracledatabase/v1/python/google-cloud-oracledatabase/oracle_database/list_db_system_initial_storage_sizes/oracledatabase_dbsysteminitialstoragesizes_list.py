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

# [START oracledatabase_v1_oracledatabase_dbsysteminitialstoragesizes_list]
import google.api_core.exceptions
from google.cloud import oracledatabase_v1


def list_db_system_initial_storage_sizes(
    project_id: str, location_id: str
) -> None:
    """Lists initial storage sizes for an Oracle Database system in a location.

    Args:
        project_id: The Google Cloud project ID (for example,
          'example-project-id').
        location_id: The Google Cloud region where the service is located (for
          example, 'us-central1').
    """
    client = oracledatabase_v1.OracleDatabaseClient()

    parent = f"projects/{project_id}/locations/{location_id}"

    request = oracledatabase_v1.ListDbSystemInitialStorageSizesRequest(
        parent=parent,
    )

    try:
        response = client.list_db_system_initial_storage_sizes(request=request)
        for item in response:
            print(f"Storage size: {item.storage_size_gb} GB")
    except google.api_core.exceptions.BadRequest as e:
        if "ENTITLEMENT_NOT_FOUND" in str(e):
            print(
                "An Oracle Database marketplace order is required to list initial"
                " storage sizes."
            )
        else:
            print(f"Request cannot be processed: {e.message}")
# [END oracledatabase_v1_oracledatabase_dbsysteminitialstoragesizes_list]
