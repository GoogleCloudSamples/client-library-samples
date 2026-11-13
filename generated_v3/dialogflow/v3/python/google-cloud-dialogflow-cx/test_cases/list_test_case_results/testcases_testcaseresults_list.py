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

# [START dialogflow_v3_testcases_testcaseresults_list]
from google.api_core.client_options import ClientOptions
from google.api_core.exceptions import GoogleAPICallError
from google.cloud import dialogflowcx_v3


def list_test_case_results(
    project_id: str, location_id: str, agent_id: str, test_case_id: str
) -> None:
    """Lists test case results for a specified test case in Dialogflow CX.

    Args:
        project_id: The Google Cloud project ID (for example,
          'example-project-id').
        location_id: The Google Cloud region where the service is located (for
          example, 'us-central1').
        agent_id: ID of the Agent (for example, 'example-agent-id').
        test_case_id: ID of the TestCase (for example, 'example-testcase-id').
    """
    client_options = ClientOptions(
        api_endpoint=(
            f"{location_id}-dialogflow.googleapis.com"
            if location_id and location_id != "global"
            else None
        ),
        quota_project_id=project_id,
    )
    client = dialogflowcx_v3.TestCasesClient(client_options=client_options)

    parent = (
        f"projects/{project_id}/locations/{location_id}/agents/{agent_id}/"
        f"testCases/{test_case_id}"
    )

    request = dialogflowcx_v3.ListTestCaseResultsRequest(
        parent=parent,
    )

    try:
        response = client.list_test_case_results(request=request)
        for result in response:
            print(f"Result identifier: {result.name}")
            print(f"Status: {result.test_result.name}")
    except GoogleAPICallError as error:
        print(f"Failed to list test case results: {error}")
# [END dialogflow_v3_testcases_testcaseresults_list]
