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

# [START dialogflow_v3_testcases_testcases_list]
import google.api_core.exceptions
from google.cloud import dialogflowcx_v3


def list_test_cases(project_id: str, location_id: str, agent_id: str) -> None:
    """Lists test cases for a Dialogflow CX agent.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or location where the Dialogflow CX
          agent is located (for example, 'global' or 'us-central1').
        agent_id: The unique identifier of the Dialogflow CX agent. This is a
          server-generated UUID (for example,
          '12345678-abcd-ef01-2345-6789abcdef01').
    """
    if location_id != "global":
        api_endpoint = f"{location_id}-dialogflow.googleapis.com"
        client = dialogflowcx_v3.TestCasesClient(
            client_options={"api_endpoint": api_endpoint}
        )
    else:
        client = dialogflowcx_v3.TestCasesClient()

    parent = f"projects/{project_id}/locations/{location_id}/agents/{agent_id}"

    request = dialogflowcx_v3.ListTestCasesRequest(
        parent=parent,
    )

    try:
        response = client.list_test_cases(request=request)
        for test_case in response:
            print(f"Test case name: {test_case.name}")
            print(f"Display name: {test_case.display_name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END dialogflow_v3_testcases_testcases_list]
