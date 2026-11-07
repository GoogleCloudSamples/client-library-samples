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

# [START dialogflow_v3_testcases_testcases_batchdelete]
from google.api_core import exceptions
from google.cloud import dialogflowcx_v3


def batch_delete_test_cases(
    project_id: str, location_id: str, agent_id: str, test_case_id: str
) -> None:
    """Deletes test cases for a Dialogflow CX agent.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        agent_id: ID of the Agent (for example, 'example-agent-id').
        test_case_id: ID of the TestCase (for example, 'example-testcase-id').
    """
    parent = f"projects/{project_id}/locations/{location_id}/agents/{agent_id}"
    names = f"projects/{project_id}/locations/{location_id}/agents/{agent_id}/testCases/{test_case_id}"

    client_options = (
        {"api_endpoint": f"{location_id}-dialogflow.googleapis.com"}
        if location_id and location_id != "global"
        else None
    )
    client = dialogflowcx_v3.TestCasesClient(client_options=client_options)

    request = dialogflowcx_v3.BatchDeleteTestCasesRequest(
        parent=parent,
        names=[names],
    )

    try:
        client.batch_delete_test_cases(request=request)
        print(f"Deleted test case: {names}")
    except exceptions.GoogleAPICallError as error:
        print(f"Error deleting test cases: {error}")
# [END dialogflow_v3_testcases_testcases_batchdelete]
