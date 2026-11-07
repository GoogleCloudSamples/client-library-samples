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

# [START datamigration_v1_datamigrationservice_connectionprofile_create]
import google.api_core.exceptions
from google.cloud import clouddms_v1


def create_connection_profile(
    connection_profile_id: str, project_id: str, location_id: str
) -> None:
    """Create a connection profile for Data Migration Service.

    Args:
        connection_profile_id: Caller-chosen identifier for the connection profile.
        project_id: Target Google Cloud project ID.
        location_id: Google Cloud region where the connection profile is created.
    """
    client = clouddms_v1.DataMigrationServiceClient()

    parent = f"projects/{project_id}/locations/{location_id}"

    mysql_profile = clouddms_v1.MySqlConnectionProfile(
        host="10.0.0.1",
        port=3306,
        username="example-user",
        password="example-password",
    )

    connection_profile = clouddms_v1.ConnectionProfile(
        display_name="Example MySQL Connection Profile",
        mysql=mysql_profile,
    )

    try:
        operation = client.create_connection_profile(
            parent=parent,
            connection_profile_id=connection_profile_id,
            connection_profile=connection_profile,
        )
        response = operation.result()
        print(f"Created connection profile: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create connection profile: {error}")
# [END datamigration_v1_datamigrationservice_connectionprofile_create]
