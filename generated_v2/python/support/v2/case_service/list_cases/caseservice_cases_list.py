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

# [START cloudsupport_v2_caseservice_cases_list]
import google.api_core.exceptions
from google.cloud import support_v2


def list_cases(project_id: str) -> None:
    """Lists customer support cases for a Google Cloud project.

    Args:
        project_id: The Google Cloud project ID.
    """
    client = support_v2.CaseServiceClient()
    parent = f"projects/{project_id}"

    request = support_v2.ListCasesRequest(parent=parent)

    try:
        response = client.list_cases(request=request)
        cases_found = False
        for case in response:
            cases_found = True
            print(f"Case Name: {case.name}")
            print(f"Display Name: {case.display_name}")
            print(f"State: {case.state.name}")

        if not cases_found:
            print(f"No support cases found for {parent}.")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to list cases: {e}")


# [END cloudsupport_v2_caseservice_cases_list]
