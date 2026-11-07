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

# [START datalineage_v1_lineage_run_delete]
import google.api_core.exceptions
from google.cloud import datacatalog_lineage_v1


def delete_run(
    project_id: str, location_id: str, process_id: str, run_id: str
) -> None:
    """Deletes a lineage run.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region where the process and run reside.
        process_id: The ID of the parent lineage process.
        run_id: The ID of the lineage run to delete.
    """
    client = datacatalog_lineage_v1.LineageClient()
    name = (
        f"projects/{project_id}/locations/{location_id}"
        f"/processes/{process_id}/runs/{run_id}"
    )

    try:
        operation = client.delete_run(name=name)
        # DeleteRun is a long-running operation that requires completion.
        operation.result()
        print(f"Deleted run: {name}")
    except google.api_core.exceptions.NotFound:
        print(f"Run resource not found: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END datalineage_v1_lineage_run_delete]
