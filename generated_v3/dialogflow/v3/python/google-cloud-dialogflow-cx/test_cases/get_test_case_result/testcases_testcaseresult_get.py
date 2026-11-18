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

# [START dialogflow_v3_testcases_testcaseresult_get]
from google.api_core.client_options import ClientOptions
import google.api_core.exceptions
from google.cloud import dialogflowcx_v3


def get_test_case_result(
    project_id: str,
    location_id: str,
    agent_id: str,
    test_case_id: str,
    test_case_result_id: str,
) -> None:
    """Retrieves the result of a specific test case run.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        agent_id: The ID of the agent (for example, 'example-agent-id').
        test_case_id: The ID of the test case (for example, 'example-testcase-id').
        test_case_result_id: The ID of the test case result (for example, 'example-testcaseresult-id').
    """
    # Configure client options with regional endpoint and quota project ID to attribute API enablement and quota
    client_options = ClientOptions(
        api_endpoint=(
            f"{location_id}-dialogflow.googleapis.com"
            if location_id != "global"
            else "dialogflow.googleapis.com"
        ),
        quota_project_id=project_id,
    )

    test_cases_client = dialogflowcx_v3.TestCasesClient(client_options=client_options)

    # Format the full resource name for the test case result
    name = (
        f"projects/{project_id}/locations/{location_id}/agents/{agent_id}/"
        f"testCases/{test_case_id}/results/{test_case_result_id}"
    )

    request = dialogflowcx_v3.GetTestCaseResultRequest(
        name=name,
    )

    try:
        response = test_cases_client.get_test_case_result(request=request)
        print(f"Test case result name: {response.name}")
        print(f"Test result: {response.test_result}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END dialogflow_v3_testcases_testcaseresult_get]
