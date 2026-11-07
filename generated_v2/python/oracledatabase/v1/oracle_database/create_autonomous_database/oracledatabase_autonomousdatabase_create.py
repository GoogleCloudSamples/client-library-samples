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

# [START oracledatabase_v1_oracledatabase_autonomousdatabase_create]
import google.api_core.exceptions
from google.cloud import oracledatabase_v1


def create_autonomous_database(
    project_id: str, location_id: str, autonomous_database_id: str
) -> None:
    """Creates an Autonomous Database in Google Cloud.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        autonomous_database_id: The ID of the Autonomous Database (for example, 'example-autonomous-database-id').
    """
    client = oracledatabase_v1.OracleDatabaseClient()

    parent = f"projects/{project_id}/locations/{location_id}"
    autonomous_database = oracledatabase_v1.AutonomousDatabase(
        database="exampledb",
        admin_password="ExamplePassword123#",
        network=f"projects/{project_id}/global/networks/default",
        cidr="10.0.0.0/24",
        properties=oracledatabase_v1.AutonomousDatabaseProperties(
            data_storage_size_gb=1024,
            compute_count=2.0,
            db_version="19c",
        ),
    )

    try:
        operation = client.create_autonomous_database(
            parent=parent,
            autonomous_database_id=autonomous_database_id,
            autonomous_database=autonomous_database,
        )
        response = operation.result()
        print(f"Created Autonomous Database: {response.name}")
    except google.api_core.exceptions.BadRequest as e:
        if "ENTITLEMENT_NOT_FOUND" in str(e):
            print(
                "Billing account requires an active Oracle Database Marketplace order."
            )
        else:
            print(f"Request could not be processed: {e.message or str(e)}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Request could not be processed: {e.message or str(e)}")
# [END oracledatabase_v1_oracledatabase_autonomousdatabase_create]
