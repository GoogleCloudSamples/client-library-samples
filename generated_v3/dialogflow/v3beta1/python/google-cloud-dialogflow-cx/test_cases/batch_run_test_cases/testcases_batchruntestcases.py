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

# [START dialogflow_v3beta1_testcases_batch_run_test_cases]
from google.api_core.exceptions import GoogleAPICallError
from google.cloud import dialogflowcx_v3beta1


def batch_run_test_cases(
    project_id: str, location_id: str, agent_id: str, test_case_id: str
) -> None:
    """Runs a batch of test cases for a Dialogflow CX agent.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region where the Dialogflow CX agent is
          located (for example, 'us-central1' or 'global').
        agent_id: The server-generated ID of the Dialogflow CX agent.
        test_case_id: The server-generated ID of the test case to run.
    """
    if location_id and location_id != "global":
        client_options = {"api_endpoint": f"{location_id}-dialogflow.googleapis.com"}
        client = dialogflowcx_v3beta1.TestCasesClient(client_options=client_options)
    else:
        client = dialogflowcx_v3beta1.TestCasesClient()

    parent = f"projects/{project_id}/locations/{location_id}/agents/{agent_id}"
    test_cases = [f"{parent}/testCases/{test_case_id}"]

    request = dialogflowcx_v3beta1.BatchRunTestCasesRequest(
        parent=parent,
        test_cases=test_cases,
    )

    try:
        operation = client.batch_run_test_cases(request=request)
        print(f"Waiting for operation to complete: {operation.operation.name}")

        response = operation.result()
        print(f"Batch run completed with {len(response.results)} result(s):")
        for result in response.results:
            print(f"- Test case: {result.name}, result: {result.test_result}")
    except GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END dialogflow_v3beta1_testcases_batch_run_test_cases]
