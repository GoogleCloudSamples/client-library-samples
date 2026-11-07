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

# [START discoveryengine_v1_projectservice_provision_project]
import google.api_core.exceptions
from google.cloud import discoveryengine_v1

client = discoveryengine_v1.ProjectServiceClient()


def provision_project(project_id: str) -> None:
    """Use the provision_project method

    Args:
        project_id: The Google Cloud project ID or project number.
    """
    data_use_terms_version = "2022-11-23"
    name = f"projects/{project_id}"
    accept_data_use_terms = True

    request = discoveryengine_v1.ProvisionProjectRequest(
        name=name,
        accept_data_use_terms=accept_data_use_terms,
        data_use_terms_version=data_use_terms_version,
    )

    try:
        operation = client.provision_project(request=request)
        print(f"Waiting for operation to complete: {operation.operation.name}")
        response = operation.result()
        print(f"Project successfully provisioned: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Provision project failed: {e.message}")


# [END discoveryengine_v1_projectservice_provision_project]
