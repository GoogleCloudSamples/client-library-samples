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

# [START migrationcenter_v1_migrationcenter_source_create]
import google.api_core.exceptions
from google.cloud import migrationcenter_v1

client = migrationcenter_v1.MigrationCenterClient()


def create_source(source_id: str, project_id: str, location_id: str) -> None:
    """Creates a Migration Center source.

    Args:
        source_id: User-specified ID for the source. For example, 'sample-source'.
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location ID (for example, 'us-central1').
    """
    parent = f"projects/{project_id}/locations/{location_id}"
    source = migrationcenter_v1.Source(
        display_name="Sample Upload Source",
        description="Source created for uploading migration data",
        type_=migrationcenter_v1.Source.SourceType.SOURCE_TYPE_UPLOAD,
    )

    try:
        operation = client.create_source(
            parent=parent,
            source_id=source_id,
            source=source,
        )
        response = operation.result()
        print(f"Created source: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to create source: {e}")
# [END migrationcenter_v1_migrationcenter_source_create]
