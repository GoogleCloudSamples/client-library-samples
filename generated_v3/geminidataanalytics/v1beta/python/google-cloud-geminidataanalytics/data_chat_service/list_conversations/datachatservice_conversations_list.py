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

# [START geminidataanalytics_v1beta_datachatservice_conversations_list]
import google.api_core.exceptions
from google.cloud import geminidataanalytics_v1beta


def list_conversations(project_id: str, location_id: str) -> None:
    """Lists conversations in the specified project and location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud location or region where the service is located (for example, 'global' or 'us-central1')
    """
    client = geminidataanalytics_v1beta.DataChatServiceClient()

    parent = f"projects/{project_id}/locations/{location_id}"

    request = geminidataanalytics_v1beta.ListConversationsRequest(
        parent=parent,
    )

    try:
        page_result = client.list_conversations(request=request)
        count = 0
        for conversation in page_result:
            print(f"Conversation name: {conversation.name}")
            count += 1
        if count == 0:
            print("No conversations found.")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END geminidataanalytics_v1beta_datachatservice_conversations_list]
