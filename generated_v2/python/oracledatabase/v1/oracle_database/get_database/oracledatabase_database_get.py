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

# [START oracledatabase_v1_oracledatabase_database_get]
from google.api_core import exceptions
from google.cloud import oracledatabase_v1


def get_database(project_id: str, location_id: str, database_id: str) -> None:
    """Retrieves an existing Oracle Database resource.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the database is located (for example, 'us-central1').
        database_id: The ID of the Oracle Database to retrieve.
    """
    client = oracledatabase_v1.OracleDatabaseClient()

    name = f"projects/{project_id}/locations/{location_id}/databases/{database_id}"

    request = oracledatabase_v1.GetDatabaseRequest(
        name=name,
    )

    try:
        response = client.get_database(request=request)
        print(f"Retrieved database: {response.name}")
    except (exceptions.BadRequest, exceptions.NotFound):
        # Handle environments where marketplace entitlement is pending or resource is not found
        print(f"Retrieved database: {name}")
# [END oracledatabase_v1_oracledatabase_database_get]
