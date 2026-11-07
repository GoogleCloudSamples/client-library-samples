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

# [START dialogflow_v3_sessions_match_intent]
import google.api_core.exceptions
from google.cloud import dialogflowcx_v3


def match_intent(
    project_id: str, location_id: str, agent_id: str, session_id: str
) -> None:
    """Matches an intent based on natural language text input.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or location where the Dialogflow CX
          agent is located.
        agent_id: The server-generated ID of the Dialogflow CX agent.
        session_id: The caller-chosen unique identifier for the session (for
          example, a UUID or alphanumeric string up to 36 characters).
    """
    session = f"projects/{project_id}/locations/{location_id}/agents/{agent_id}/sessions/{session_id}"
    query_input = dialogflowcx_v3.QueryInput(
        text=dialogflowcx_v3.TextInput(text="hello"),
        language_code="en",
    )

    # Regional endpoints require configuring the location-specific API endpoint.
    if location_id != "global":
        api_endpoint = f"{location_id}-dialogflow.googleapis.com"
        session_client = dialogflowcx_v3.SessionsClient(
            client_options={"api_endpoint": api_endpoint}
        )
    else:
        session_client = dialogflowcx_v3.SessionsClient()

    request = dialogflowcx_v3.MatchIntentRequest(
        session=session,
        query_input=query_input,
    )

    try:
        response = session_client.match_intent(request=request)
        for match in response.matches:
            print(f"Matched intent: {match.intent.display_name}")
            print(f"Confidence: {match.confidence}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END dialogflow_v3_sessions_match_intent]
