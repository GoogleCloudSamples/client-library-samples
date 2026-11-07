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

# [START dataflow_v1beta3_snapshotsv1beta3_snapshots_list]
import google.api_core.exceptions
from google.cloud import dataflow_v1beta3


def list_snapshots(project_id: str, location_id: str, job_id: str) -> None:
    """Lists snapshots for a Cloud Dataflow job in a Google Cloud project.

    Args:
        project_id: The ID of the Google Cloud project that contains the job.
        location_id: The Google Cloud region where the Dataflow job executed.
        job_id: The server-generated ID of the Dataflow job.
    """
    client = dataflow_v1beta3.SnapshotsV1Beta3Client()

    request = dataflow_v1beta3.ListSnapshotsRequest(
        project_id=project_id,
        location=location_id,
        job_id=job_id,
    )

    try:
        response = client.list_snapshots(request=request)
        print(f"Found {len(response.snapshots)} snapshots for job {job_id}.")
        for snapshot in response.snapshots:
            print(f"Snapshot ID: {snapshot.id}")
            print(f"State: {snapshot.state}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END dataflow_v1beta3_snapshotsv1beta3_snapshots_list]
