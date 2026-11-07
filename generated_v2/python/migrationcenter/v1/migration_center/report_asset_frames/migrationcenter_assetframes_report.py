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

# [START migrationcenter_v1_migrationcenter_report_asset_frames]
import google.api_core.exceptions
from google.cloud import migrationcenter_v1
from google.protobuf import timestamp_pb2

client = migrationcenter_v1.MigrationCenterClient()


def report_asset_frames(project_id: str, location_id: str, source_id: str) -> None:
    """Use the report_asset_frames method

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region/location ID.
        source_id: The user-specified ID of the Migration Center Source.
    """
    parent = f"projects/{project_id}/locations/{location_id}"
    source = f"projects/{project_id}/locations/{location_id}/sources/{source_id}"

    report_time = timestamp_pb2.Timestamp()
    report_time.GetCurrentTime()

    machine_details = migrationcenter_v1.MachineDetails(
        uuid="example-uuid-12345",
        machine_name="example-server-01",
    )

    asset_frame = migrationcenter_v1.AssetFrame(
        report_time=report_time,
        machine_details=machine_details,
    )

    frames = migrationcenter_v1.Frames(
        frames_data=[asset_frame],
    )

    request = migrationcenter_v1.ReportAssetFramesRequest(
        parent=parent,
        source=source,
        frames=frames,
    )

    try:
        client.report_asset_frames(request=request)
        print(f"Reported asset frames successfully to source: {source}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e.message}")
# [END migrationcenter_v1_migrationcenter_report_asset_frames]
