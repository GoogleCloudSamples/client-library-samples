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

# [START alloydb_v1_alloydbadmin_supporteddatabaseflags_list]
import google.api_core.exceptions
from google.cloud import alloydb_v1

client = alloydb_v1.AlloyDBAdminClient()


def list_supported_database_flags(project_id: str, location_id: str) -> None:
    """Lists supported database flags for AlloyDB in a given location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
    """
    parent = f"projects/{project_id}/locations/{location_id}"

    request = alloydb_v1.ListSupportedDatabaseFlagsRequest(
        parent=parent,
    )

    try:
        page_result = client.list_supported_database_flags(request=request)
        for flag in page_result:
            print(f"Flag Name: {flag.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list supported database flags: {error}")
# [END alloydb_v1_alloydbadmin_supporteddatabaseflags_list]
