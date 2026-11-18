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

# [START dialogflow_v3beta1_testcases_testcase_update]
from google.api_core.exceptions import GoogleAPICallError
from google.cloud import dialogflowcx_v3beta1
from google.protobuf import field_mask_pb2


def update_test_case(
    project_id: str, location_id: str, agent_id: str, test_case_id: str
) -> None:
    """Updates the display name of a Dialogflow CX test case.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Dialogflow CX location ID (for example, 'global',
          'us-central1').
        agent_id: The ID of the Dialogflow CX agent.
        test_case_id: The unique identifier of the test case to update.
    """
    client_options = None
    if location_id != "global":
        client_options = {
            "api_endpoint": f"{location_id}-dialogflow.googleapis.com"
        }

    client = dialogflowcx_v3beta1.TestCasesClient(client_options=client_options)

    test_case = dialogflowcx_v3beta1.TestCase(
        name=f"projects/{project_id}/locations/{location_id}/agents/{agent_id}/testCases/{test_case_id}",
        display_name="Updated Example Test Case Display Name",
    )
    update_mask = field_mask_pb2.FieldMask(paths=["display_name"])

    request = dialogflowcx_v3beta1.UpdateTestCaseRequest(
        test_case=test_case,
        update_mask=update_mask,
    )

    try:
        response = client.update_test_case(request=request)
        print(f"Updated test case name: {response.name}")
        print(f"Updated display name: {response.display_name}")
    except GoogleAPICallError as e:
        print(f"Failed to update test case: {e}")
# [END dialogflow_v3beta1_testcases_testcase_update]
