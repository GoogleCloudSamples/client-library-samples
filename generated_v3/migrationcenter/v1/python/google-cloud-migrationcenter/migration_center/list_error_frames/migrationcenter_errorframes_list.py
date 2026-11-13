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

# [START migrationcenter_v1_migrationcenter_errorframes_list]
from google.api_core import exceptions
from google.cloud import migrationcenter_v1


def list_error_frames(project_id: str, location_id: str, source_id: str) -> None:
    """Lists error frames for a source in Migration Center.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or location ID.
        source_id: The ID of the source whose error frames are listed.
    """
    client = migrationcenter_v1.MigrationCenterClient()

    parent = f"projects/{project_id}/locations/{location_id}/sources/{source_id}"

    request = migrationcenter_v1.ListErrorFramesRequest(
        parent=parent,
    )

    try:
        response = client.list_error_frames(request=request)
        frame_count = 0
        for error_frame in response:
            print(f"Error frame name: {error_frame.name}")
            frame_count += 1

        if frame_count == 0:
            print(f"No error frames found for source {source_id}.")
        else:
            print(f"Total error frames found: {frame_count}")
    except exceptions.GoogleAPICallError as e:
        print(f"Failed to list error frames: {e}")
# [END migrationcenter_v1_migrationcenter_errorframes_list]
