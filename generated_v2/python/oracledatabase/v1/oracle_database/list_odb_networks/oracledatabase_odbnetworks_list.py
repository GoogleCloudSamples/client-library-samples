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

# [START oracledatabase_v1_oracledatabase_odbnetworks_list]
import google.api_core.exceptions
from google.cloud import oracledatabase_v1


def list_odb_networks(project_id: str, location_id: str) -> None:
    """List Oracle Database networks in a location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
    """
    client = oracledatabase_v1.OracleDatabaseClient()
    parent = client.common_location_path(project_id, location_id)

    try:
        response = client.list_odb_networks(parent=parent)
        count = 0
        for odb_network in response:
            print(f"ODB Network name: {odb_network.name}")
            count += 1

        if count == 0:
            print("No ODB networks found.")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call error occurred: {e}")


# [END oracledatabase_v1_oracledatabase_odbnetworks_list]
