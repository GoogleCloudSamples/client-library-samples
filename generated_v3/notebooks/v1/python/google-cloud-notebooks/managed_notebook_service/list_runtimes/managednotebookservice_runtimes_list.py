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

# [START notebooks_v1_managednotebookservice_runtimes_list]
import google.api_core.exceptions
from google.cloud import notebooks_v1


def list_runtimes(project_id: str, location_id: str) -> None:
    """Lists Managed Notebook runtimes in a specified location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the runtimes are located (for example, 'us-central1').
    """
    client = notebooks_v1.ManagedNotebookServiceClient()
    parent = f"projects/{project_id}/locations/{location_id}"
    request = notebooks_v1.ListRuntimesRequest(parent=parent)

    try:
        response = client.list_runtimes(request=request)
        found_runtime = False
        for runtime in response:
            found_runtime = True
            print(f"Runtime name: {runtime.name}")
            print(f"Runtime state: {runtime.state}")

        if not found_runtime:
            print(f"No runtimes found in {parent}.")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list runtimes: {error}")
# [END notebooks_v1_managednotebookservice_runtimes_list]
