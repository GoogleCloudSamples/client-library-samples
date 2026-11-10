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

# [START apptopology_v1_apptopology_domains_list]
import google.api_core.exceptions
from google.cloud import apptopology_v1

client = apptopology_v1.AppTopologyClient()


def list_domains(project_id: str, location_id: str) -> None:
    """List domains in an App Topology deployment.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud location for App Topology. Only 'global' is supported.
    """
    parent = f"projects/{project_id}/locations/{location_id}"

    try:
        response = client.list_domains(parent=parent)
        for domain in response:
            print(f"Domain: {domain.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END apptopology_v1_apptopology_domains_list]
