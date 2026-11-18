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

# [START dialogflow_v3_testcases_run_test_case]
import google.api_core.exceptions
from google.cloud import dialogflowcx_v3


def run_test_case(
    project_id: str, location_id: str, agent_id: str, test_case_id: str
) -> None:
    """Runs a test case in Dialogflow CX.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        agent_id: ID of the Agent (for example, 'example-agent-id').
        test_case_id: ID of the TestCase (for example, 'example-testcase-id').
    """
    client_options = {"quota_project_id": project_id}
    if location_id != "global":
        client_options["api_endpoint"] = f"{location_id}-dialogflow.googleapis.com"

    client = dialogflowcx_v3.TestCasesClient(client_options=client_options)

    name = f"projects/{project_id}/locations/{location_id}/agents/{agent_id}/testCases/{test_case_id}"

    request = dialogflowcx_v3.RunTestCaseRequest(
        name=name,
    )

    try:
        operation = client.run_test_case(request=request)
        response = operation.result()
        print(f"Test case run completed: {response.result.test_result.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to run test case: {e}")


# [END dialogflow_v3_testcases_run_test_case]
