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

# [START cloudsupport_v2_caseservice_cases_search]
from google.api_core.exceptions import GoogleAPICallError
from google.cloud import support_v2


def search_cases(project_id: str, query: str) -> None:
    """Search support cases for a Google Cloud project.

    Args:
        project_id: Google Cloud project ID under which to search for cases.
        query: Filter expression used to query cases, for example 'state=OPEN'.
    """
    client = support_v2.CaseServiceClient()
    parent = f"projects/{project_id}"

    request = support_v2.SearchCasesRequest(
        parent=parent,
        query=query,
    )

    try:
        response = client.search_cases(request=request)
        cases = list(response)
        print(f"Total cases found: {len(cases)}")
        for case in cases:
            print(f"Case name: {case.name}")
            print(f"Display name: {case.display_name}")
    except GoogleAPICallError as error:
        print(f"Failed to search cases: {error}")


# [END cloudsupport_v2_caseservice_cases_search]
