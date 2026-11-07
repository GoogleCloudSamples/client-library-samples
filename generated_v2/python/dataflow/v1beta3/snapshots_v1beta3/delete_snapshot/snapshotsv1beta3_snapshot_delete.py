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

# [START dataflow_v1beta3_snapshotsv1beta3_snapshot_delete]
import os

import google.api_core.exceptions
from google.cloud import dataflow_v1beta3


def delete_snapshot() -> None:
    """Delete a Cloud Dataflow snapshot."""
    client = dataflow_v1beta3.SnapshotsV1Beta3Client()
    project_id = os.environ["GOOGLE_CLOUD_PROJECT"]

    request = dataflow_v1beta3.DeleteSnapshotRequest(
        project_id=project_id,
        location="us-central1",
        snapshot_id="example-snapshot-id",
    )

    try:
        response = client.delete_snapshot(request=request)
        print(f"Deleted snapshot successfully: {response}")
    except google.api_core.exceptions.NotFound:
        print("Target snapshot not found.")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API request failed: {error.message}")
# [END dataflow_v1beta3_snapshotsv1beta3_snapshot_delete]
