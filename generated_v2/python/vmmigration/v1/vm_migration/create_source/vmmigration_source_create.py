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

# [START vmmigration_v1_vmmigration_source_create]
import google.api_core.exceptions
from google.cloud import vmmigration_v1


def create_source(source_id: str, project_id: str, location_id: str) -> None:
    """Creates a migration source.

    Args:
        source_id: Caller-chosen identifier for the new source.
        project_id: The Google Cloud project ID where the source is created.
        location_id: The Google Cloud region where the source is created.
    """
    client = vmmigration_v1.VmMigrationClient()

    parent = f"projects/{project_id}/locations/{location_id}"
    source = vmmigration_v1.Source(
        description="Production VMware migration source",
        vmware=vmmigration_v1.VmwareSourceDetails(
            username="example-username",
            password="example-password",
            vcenter_ip="10.0.0.1",
        ),
    )

    try:
        operation = client.create_source(
            parent=parent,
            source_id=source_id,
            source=source,
        )
        response = operation.result()
        print(f"Created migration source: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to create source: {e.message}")
# [END vmmigration_v1_vmmigration_source_create]
