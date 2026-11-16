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

# [START oracledatabase_v1_oracledatabase_databases_list]
import google.api_core.exceptions
from google.cloud import oracledatabase_v1


def list_databases(project_id: str, region_id: str) -> None:
    """Lists Oracle databases in a specified project and location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        region_id: The Google Cloud region (for example, 'us-central1')
    """
    client = oracledatabase_v1.OracleDatabaseClient()
    parent = f"projects/{project_id}/locations/{region_id}"

    request = oracledatabase_v1.ListDatabasesRequest(
        parent=parent,
    )

    try:
        page_result = client.list_databases(request=request)
        has_databases = False
        for database in page_result:
            has_databases = True
            print(f"Database name: {database.name}")
        if not has_databases:
            print("No databases found in location.")
    except google.api_core.exceptions.BadRequest as exc:
        if "ENTITLEMENT_NOT_FOUND" in str(exc):
            print("Marketplace order required to view databases.")
        else:
            print(f"Request unfulfilled: {exc.code}")
    except google.api_core.exceptions.NotFound as exc:
        print(f"Resource not found: {exc.code}")
# [END oracledatabase_v1_oracledatabase_databases_list]
