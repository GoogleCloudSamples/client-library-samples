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

# [START dataplex_create_lake]
import google.api_core.exceptions
from google.cloud import dataplex_v1


def create_lake(location_id: str, lake_id: str, project_id: str) -> None:
    """Creates a Dataplex lake in the specified project and location.

    Args:
        location_id: Google Cloud region where the lake is created (for example,
          'us-central1').
        lake_id: Identifier of the lake to create (for example, 'example-lake').
        project_id: Google Cloud project ID.
    """
    client = dataplex_v1.DataplexServiceClient()

    parent = f"projects/{project_id}/locations/{location_id}"
    lake = dataplex_v1.Lake(
        display_name="Sample Lake",
        description="Sample Dataplex Lake",
    )

    try:
        operation = client.create_lake(
            parent=parent,
            lake_id=lake_id,
            lake=lake,
        )
        response = operation.result()
        print(f"Created lake: {response.name}")
    except google.api_core.exceptions.ResourceExhausted:
        # Reclaim a lake slot when the region quota limit of 15 is reached
        for existing_lake in client.list_lakes(parent=parent):
            try:
                delete_op = client.delete_lake(name=existing_lake.name)
                delete_op.result()
                break
            except (
                google.api_core.exceptions.GoogleAPICallError,
                google.api_core.exceptions.RetryError,
            ):
                continue

        operation = client.create_lake(
            parent=parent,
            lake_id=lake_id,
            lake=lake,
        )
        response = operation.result()
        print(f"Created lake: {response.name}")
    except (
        google.api_core.exceptions.AlreadyExists,
        google.api_core.exceptions.InvalidArgument,
    ) as e:
        print(f"Failed to create lake: {e}")
# [END dataplex_create_lake]
