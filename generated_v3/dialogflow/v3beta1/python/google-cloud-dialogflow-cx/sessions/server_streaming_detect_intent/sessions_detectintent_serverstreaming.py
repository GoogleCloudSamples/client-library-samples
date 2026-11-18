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

# [START dialogflow_v3beta1_sessions_server_streaming_detect_intent]
from google.api_core.client_options import ClientOptions
import google.api_core.exceptions
from google.cloud import dialogflowcx_v3beta1


def server_streaming_detect_intent(
    project_id: str, location_id: str, agent_id: str, session_id: str
) -> None:
    """Sends a conversational query to a session and streams back responses.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        agent_id: The ID of the agent (for example, 'example-agent-id').
        session_id: The ID of the session (for example, 'example-session-id').
    """
    api_endpoint = (
        f"{location_id}-dialogflow.googleapis.com"
        if location_id != "global"
        else "dialogflow.googleapis.com"
    )
    client_options = ClientOptions(
        api_endpoint=api_endpoint,
        quota_project_id=project_id,
    )

    client = dialogflowcx_v3beta1.SessionsClient(client_options=client_options)

    session = (
        f"projects/{project_id}/locations/{location_id}/agents/{agent_id}/sessions/{session_id}"
    )
    query_input = dialogflowcx_v3beta1.QueryInput(
        text=dialogflowcx_v3beta1.TextInput(text="Hello"),
        language_code="en-US",
    )

    request = dialogflowcx_v3beta1.DetectIntentRequest(
        session=session,
        query_input=query_input,
    )

    try:
        response_stream = client.server_streaming_detect_intent(request=request)
        for response in response_stream:
            print(f"Response ID: {response.response_id}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Request failed: {e}")
# [END dialogflow_v3beta1_sessions_server_streaming_detect_intent]
