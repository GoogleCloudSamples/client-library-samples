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

# [START dataform_v1_dataform_compute_repository_access_token_status]
import google.api_core.exceptions
from google.cloud import dataform_v1

client = dataform_v1.DataformClient()


def compute_repository_access_token_status(
    project_id: str, location_id: str, repository_id: str
) -> None:
    """Computes the status of the Dataform repository access token.

    Args:
        project_id: The Google Cloud project ID where the repository exists.
        location_id: The Google Cloud region of the Dataform repository (for
          example, 'us-central1').
        repository_id: The ID of the Dataform repository.
    """
    name = f"projects/{project_id}/locations/{location_id}/repositories/{repository_id}"

    request = dataform_v1.ComputeRepositoryAccessTokenStatusRequest(
        name=name,
    )

    try:
        response = client.compute_repository_access_token_status(request=request)
        print(f"Repository access token status: {response.token_status.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to compute repository access token status: {error}")


# [END dataform_v1_dataform_compute_repository_access_token_status]
