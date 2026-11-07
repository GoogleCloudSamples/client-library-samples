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

# [START datalineage_v1_lineage_runs_list]
import google.api_core.exceptions
from google.cloud import datacatalog_lineage_v1


def list_runs(project_id: str, location_id: str, process_id: str) -> None:
    """Lists lineage runs for a specified process.

    Args:
        project_id: The Google Cloud project ID owning the lineage process.
        location_id: The Google Cloud region ID (for example, 'us-central1').
        process_id: The ID of the lineage process.
    """
    client = datacatalog_lineage_v1.LineageClient()
    parent = f"projects/{project_id}/locations/{location_id}/processes/{process_id}"

    request = datacatalog_lineage_v1.ListRunsRequest(parent=parent)

    try:
        page_result = client.list_runs(request=request)
        for run in page_result:
            print(f"Run name: {run.name}")
            print(f"Run state: {run.state.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list lineage runs: {error}")
# [END datalineage_v1_lineage_runs_list]
