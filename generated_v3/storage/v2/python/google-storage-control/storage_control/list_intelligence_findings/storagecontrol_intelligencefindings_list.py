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

# [START storage_v2_storagecontrol_intelligencefindings_list]
import google.api_core.exceptions
from google.cloud import storage_control_v2


def list_intelligence_findings(project_id: str, location_id: str) -> None:
    """Lists intelligence findings for a Google Cloud project and location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud location ID (for example, 'global').
    """
    client = storage_control_v2.StorageControlClient()
    parent = f"projects/{project_id}/locations/{location_id}"

    try:
        request = storage_control_v2.ListIntelligenceFindingsRequest(parent=parent)
        findings_iterator = client.list_intelligence_findings(request=request)

        findings_found = False
        for finding in findings_iterator:
            findings_found = True
            print(f"Finding: {finding.name}")

        if not findings_found:
            print("No intelligence findings found.")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Request failed: {error.message}")
# [END storage_v2_storagecontrol_intelligencefindings_list]
