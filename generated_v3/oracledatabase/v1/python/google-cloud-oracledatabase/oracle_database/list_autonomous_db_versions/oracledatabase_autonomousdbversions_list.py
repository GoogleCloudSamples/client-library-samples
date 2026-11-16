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

# [START oracledatabase_v1_oracledatabase_autonomousdbversions_list]
from google.api_core import exceptions
from google.cloud import oracledatabase_v1


def list_autonomous_db_versions(project_id: str, location_id: str) -> None:
    """Lists the Autonomous Database versions available in a given project and location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
    """
    client = oracledatabase_v1.OracleDatabaseClient()

    parent = f"projects/{project_id}/locations/{location_id}"

    request = oracledatabase_v1.ListAutonomousDbVersionsRequest(
        parent=parent,
    )

    try:
        page_result = client.list_autonomous_db_versions(request=request)
        for autonomous_db_version in page_result:
            print(f"Version: {autonomous_db_version.version}")
            print(f"Resource Name: {autonomous_db_version.name}")
            print(f"Workload Type: {autonomous_db_version.db_workload.name}")
    except exceptions.BadRequest as exc:
        print(
            "Autonomous Database versions require an active marketplace order: "
            f"{exc.message}"
        )
    except exceptions.GoogleAPICallError as exc:
        print(f"Autonomous Database versions call halted: {exc.message}")
# [END oracledatabase_v1_oracledatabase_autonomousdbversions_list]
