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

# [START datalineage_v1_lineage_process_get]
import google.api_core.exceptions
from google.cloud import datacatalog_lineage_v1


def get_process(project_id: str, location_id: str, process_id: str) -> None:
    """Retrieves a lineage process.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or location of the process (for
          example, 'us-central1').
        process_id: The identifier of the process to retrieve.
    """
    client = datacatalog_lineage_v1.LineageClient()

    name = f"projects/{project_id}/locations/{location_id}/processes/{process_id}"

    try:
        response = client.get_process(name=name)
        print(f"Process retrieved: {response.name}")
        print(f"Display name: {response.display_name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve process: {error}")
# [END datalineage_v1_lineage_process_get]
