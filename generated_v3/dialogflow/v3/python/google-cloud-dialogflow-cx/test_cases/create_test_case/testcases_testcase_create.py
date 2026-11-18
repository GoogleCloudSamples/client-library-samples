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

# [START dialogflow_v3_testcases_testcase_create]
import google.api_core.exceptions
from google.cloud import dialogflowcx_v3


def create_test_case(project_id: str, location_id: str, agent_id: str) -> None:
    """Creates a test case for a Dialogflow CX agent.

    Args:
        project_id: The Google Cloud project ID (for example,
          'example-project-id').
        location_id: The Google Cloud region where the agent is located (for
          example, 'us-central1').
        agent_id: The unique identifier of the Dialogflow CX agent (for example,
          '12345678-abcd-1234-abcd-1234567890ab').
    """
    if location_id != "global":
        client_options = {"api_endpoint": f"{location_id}-dialogflow.googleapis.com"}
        client = dialogflowcx_v3.TestCasesClient(client_options=client_options)
    else:
        client = dialogflowcx_v3.TestCasesClient()

    test_case = dialogflowcx_v3.TestCase(
        display_name="example-test-case",
    )
    parent = f"projects/{project_id}/locations/{location_id}/agents/{agent_id}"

    try:
        response = client.create_test_case(
            parent=parent,
            test_case=test_case,
        )
        print(f"Created test case: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"Failed to create test case: {exc}")
# [END dialogflow_v3_testcases_testcase_create]
