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

# [START dataform_v1beta1_dataform_query_repository_directory_contents]
import google.api_core.exceptions
from google.cloud import dataform_v1beta1

client = dataform_v1beta1.DataformClient()


def query_repository_directory_contents(
    project_id: str, location_id: str, repository_id: str
) -> None:
    """Queries the contents of a directory in a Dataform repository.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region of the Dataform repository.
        repository_id: The ID of the Dataform repository.
    """
    name = (
        f"projects/{project_id}/locations/{location_id}/repositories/{repository_id}"
    )

    request = dataform_v1beta1.QueryRepositoryDirectoryContentsRequest(
        name=name,
    )

    try:
        response = client.query_repository_directory_contents(request=request)
        for entry in response:
            if entry.file:
                print(f"File: {entry.file}")
            elif entry.directory:
                print(f"Directory: {entry.directory}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Directory query failed: {error}")
# [END dataform_v1beta1_dataform_query_repository_directory_contents]
