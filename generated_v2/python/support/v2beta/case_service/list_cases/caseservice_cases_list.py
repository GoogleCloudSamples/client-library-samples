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

# [START cloudsupport_v2beta_caseservice_cases_list]
import google.api_core.exceptions
from google.cloud import support_v2


def list_cases(project_id: str) -> None:
    """Lists support cases under a Google Cloud project.

    Args:
        project_id: The Google Cloud project ID to list support cases under.
    """
    client = support_v2.CaseServiceClient()

    # Construct the parent resource name
    parent = f"projects/{project_id}"

    try:
        request = support_v2.ListCasesRequest(parent=parent)
        response = client.list_cases(request=request)

        found_case = False
        for case in response:
            found_case = True
            print(f"Case Name: {case.name}, Display Name: {case.display_name}")

        if not found_case:
            print(f"No cases found for {parent}.")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"Failed to list cases: {exc}")
# [END cloudsupport_v2beta_caseservice_cases_list]
