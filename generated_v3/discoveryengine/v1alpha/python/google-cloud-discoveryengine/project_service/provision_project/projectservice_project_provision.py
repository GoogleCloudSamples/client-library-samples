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

# [START discoveryengine_v1alpha_projectservice_provision_project]
import google.api_core.exceptions
from google.cloud import discoveryengine_v1alpha

client = discoveryengine_v1alpha.ProjectServiceClient()


def provision_project(project_id: str) -> None:
    """Provisions a Google Cloud project for Discovery Engine.

    Args:
        project_id: The Google Cloud project ID.
    """
    data_use_terms_version = "2022-11-23"
    name = f"projects/{project_id}"
    accept_data_use_terms = True

    request = discoveryengine_v1alpha.ProvisionProjectRequest(
        name=name,
        accept_data_use_terms=accept_data_use_terms,
        data_use_terms_version=data_use_terms_version,
    )

    try:
        operation = client.provision_project(request=request)
        response = operation.result()
        print(f"Project provisioned: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"Project provisioning failed: {exc.message}")
# [END discoveryengine_v1alpha_projectservice_provision_project]
