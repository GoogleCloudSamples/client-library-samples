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

# [START datalineage_v1_lineage_process_create]
import google.api_core.exceptions
from google.cloud import datacatalog_lineage_v1


def create_process(project_id: str, location_id: str) -> None:
    """Use the create_process method to define a Data Lineage process.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or location ID (for example, 'us-central1').
    """
    client = datacatalog_lineage_v1.LineageClient()

    parent = f"projects/{project_id}/locations/{location_id}"
    process = datacatalog_lineage_v1.Process(
        display_name="example-process",
        origin=datacatalog_lineage_v1.Origin(
            source_type=datacatalog_lineage_v1.Origin.SourceType.CUSTOM
        ),
    )

    try:
        response = client.create_process(parent=parent, process=process)
        print(f"Created process: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END datalineage_v1_lineage_process_create]
