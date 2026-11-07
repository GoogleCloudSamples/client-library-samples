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

# [START dataform_v1beta1_dataform_compilationresults_list]
import google.api_core.exceptions
from google.cloud import dataform_v1beta1


def list_compilation_results(
    project_id: str, location_id: str, repository_id: str
) -> None:
    """Lists compilation results in a Dataform repository.

    Args:
        project_id: The Google Cloud project ID (for example,
          'example-project-id').
        location_id: The Google Cloud region where the repository is located
          (for example, 'us-central1').
        repository_id: The ID of the Dataform repository (for example,
          'example-repository-id').
    """
    client = dataform_v1beta1.DataformClient()

    parent = (
        f"projects/{project_id}/locations/{location_id}/repositories/{repository_id}"
    )

    try:
        request = dataform_v1beta1.ListCompilationResultsRequest(
            parent=parent,
        )
        response = client.list_compilation_results(request=request)

        count = 0
        for compilation_result in response:
            print(f"Compilation result: {compilation_result.name}")
            print(f"Git commitish: {compilation_result.git_commitish}")
            count += 1

        print(f"Total compilation results listed: {count}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END dataform_v1beta1_dataform_compilationresults_list]
