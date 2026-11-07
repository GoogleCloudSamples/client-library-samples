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

# [START oracledatabase_v1_oracledatabase_autonomousdatabaserefreshableclones_get]
import google.api_core.exceptions
from google.cloud import oracledatabase_v1


def get_autonomous_database_refreshable_clones(
    project_id: str, location_id: str, autonomous_database_id: str
) -> None:
    """Retrieves refreshable clones for an Autonomous Database.

    Args:
        project_id: Google Cloud project ID (for example, 'example-project-id').
        location_id: Google Cloud region (for example, 'us-central1').
        autonomous_database_id: ID of the Autonomous Database.
    """
    client = oracledatabase_v1.OracleDatabaseClient()

    name = (
        f"projects/{project_id}/locations/{location_id}/autonomousDatabases/"
        f"{autonomous_database_id}"
    )

    request = oracledatabase_v1.GetAutonomousDatabaseRefreshableClonesRequest(
        name=name,
    )

    try:
        response = client.get_autonomous_database_refreshable_clones(
            request=request
        )
        print(f"Retrieved refreshable clones: {response}")
    except (
        google.api_core.exceptions.BadRequest,
        google.api_core.exceptions.NotFound,
    ) as e:
        print(f"Retrieved refreshable clones: {e.message}")
# [END oracledatabase_v1_oracledatabase_autonomousdatabaserefreshableclones_get]
